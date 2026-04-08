import { Router, type IRouter } from "express";
import crypto from "crypto";

const router: IRouter = Router();

const PAYOUT_WALLET = "0xB4c4F2DaeF5D2c0FDdd4b2c58F79EF1A1eB7A82a";
const TICKER = "polygon/usdc";

const pendingDonations = new Map<string, { amountPhp: number; name: string; paidAt?: string }>();

// ---------------------------------------------------------------------------
// HitPay helpers
// ---------------------------------------------------------------------------

const HITPAY_API_BASE = "https://api.hit-pay.com/v1";

/**
 * Build the HMAC signature expected by HitPay webhooks.
 * Algorithm: for each key/value pair (excluding 'hmac'), concatenate as
 * "<key><value>", sort alphabetically, join, then HMAC-SHA256 with the salt.
 */
function verifyHitPayWebhook(salt: string, payload: Record<string, string>, receivedHmac: string): boolean {
  const filtered: Record<string, string> = {};
  for (const [k, v] of Object.entries(payload)) {
    if (k !== "hmac" && v !== "" && v !== null && v !== undefined) {
      filtered[k] = v;
    }
  }

  const parts = Object.entries(filtered)
    .map(([k, v]) => `${k}${v}`)
    .sort();

  const sig = parts.join("");
  const calculated = crypto.createHmac("sha256", salt).update(sig).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(calculated, "hex"), Buffer.from(receivedHmac, "hex"));
}

async function handleFiatDonation(
  req: Parameters<Parameters<IRouter["post"]>[1]>[0],
  res: Parameters<Parameters<IRouter["post"]>[1]>[1],
  amountPhp: number,
  firstName: string,
  lastName: string,
  email: string
) {
  const apiKey = process.env.HITPAY_API_KEY;
  if (!apiKey) {
    req.log.error("HITPAY_API_KEY is not set");
    res.status(500).json({ error: "Payment service not configured." });
    return;
  }

  const origin = (req.headers.origin ?? "").replace(/\/$/, "");
  const redirectUrl = origin ? `${origin}/thank-you` : `${req.protocol}://${req.get("host")}/thank-you`;

  const referenceNumber = `BHSF-${Date.now()}`;

  const params = new URLSearchParams({
    amount: amountPhp.toFixed(2),
    currency: "PHP",
    email,
    name: `${firstName} ${lastName}`,
    purpose: `BHSF Donation — ₱${amountPhp}`,
    reference_number: referenceNumber,
    redirect_url: redirectUrl,
    send_email: "false",
    allow_repeated_payments: "false",
  });

  const hitPayRes = await fetch(`${HITPAY_API_BASE}/payment-requests`, {
    method: "POST",
    headers: {
      "X-BUSINESS-API-KEY": apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: params.toString(),
  });

  if (!hitPayRes.ok) {
    const errBody = await hitPayRes.text();
    req.log.error({ status: hitPayRes.status, body: errBody }, "HitPay error");
    res.status(502).json({ error: "Payment provider error. Please try again." });
    return;
  }

  const data = await hitPayRes.json() as { id?: string; url?: string; status?: string };
  if (!data.url) {
    req.log.error({ data }, "HitPay returned no checkout URL");
    res.status(502).json({ error: "Payment provider returned no checkout URL." });
    return;
  }

  req.log.info({ amountPhp, email, referenceNumber, paymentRequestId: data.id }, "Fiat donation payment request created via HitPay");
  res.json({ method: "fiat", checkoutUrl: data.url, paymentRequestId: data.id, referenceNumber });
}

// ---------------------------------------------------------------------------
// Crypto (PayGate.to) helpers
// ---------------------------------------------------------------------------

async function getForwardingAddress(req: Parameters<Parameters<IRouter["post"]>[1]>[0], donationId: string): Promise<string | null> {
  const apiBase = process.env.API_PUBLIC_URL ?? `${req.protocol}://${req.get("host")}`;
  const callbackUrl = `${apiBase}/api/donate/callback?id=${donationId}`;
  const walletRes = await fetch(
    `https://api.paygate.to/crypto/${TICKER}/wallet.php?address=${PAYOUT_WALLET}&callback=${encodeURIComponent(callbackUrl)}`
  );
  if (!walletRes.ok) return null;
  const walletData = await walletRes.json() as { address_in?: string };
  return walletData.address_in ?? null;
}

async function handleCryptoDonation(
  req: Parameters<Parameters<IRouter["post"]>[1]>[0],
  res: Parameters<Parameters<IRouter["post"]>[1]>[1],
  amountPhp: number,
  firstName: string,
  lastName: string
) {
  const convertRes = await fetch(
    `https://api.paygate.to/crypto/${TICKER}/convert.php?from=PHP&value=${amountPhp}`
  );
  if (!convertRes.ok) {
    res.status(502).json({ error: "Currency conversion failed. Please try again." });
    return;
  }
  const convertData = await convertRes.json() as { status: string; value_coin: string; exchange_rate: string };
  if (convertData.status !== "success") {
    res.status(502).json({ error: "Currency conversion failed." });
    return;
  }

  const donationId = crypto.randomUUID();
  const addressIn = await getForwardingAddress(req, donationId);
  if (!addressIn) {
    res.status(502).json({ error: "Failed to generate payment address. Please try again." });
    return;
  }

  const qrRes = await fetch(
    `https://api.paygate.to/crypto/${TICKER}/qrcode.php?address=${addressIn}`
  );
  let qrCode: string | null = null;
  if (qrRes.ok) {
    const qrData = await qrRes.json() as { status: string; qr_code?: string };
    if (qrData.status === "success" && qrData.qr_code) qrCode = qrData.qr_code;
  }

  pendingDonations.set(donationId, { amountPhp, name: `${firstName} ${lastName}` });
  req.log.info({ donationId, amountPhp, address: addressIn }, "Crypto donation created");

  res.json({
    method: "crypto",
    donationId,
    addressIn,
    amountCoin: convertData.value_coin,
    exchangeRate: convertData.exchange_rate,
    qrCode,
    network: "Polygon",
    ticker: "USDC",
  });
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

router.post("/donate", async (req, res) => {
  const { amountPhp, firstName, lastName, email, paymentMethod } = req.body as {
    amountPhp: unknown;
    firstName: unknown;
    lastName: unknown;
    email: unknown;
    paymentMethod: unknown;
  };

  if (
    typeof amountPhp !== "number" || amountPhp < 50 ||
    typeof firstName !== "string" || firstName.trim().length === 0 ||
    typeof lastName !== "string" || lastName.trim().length === 0 ||
    typeof email !== "string" || !email.includes("@")
  ) {
    res.status(400).json({ error: "Invalid request. Minimum donation is ₱50." });
    return;
  }

  try {
    if (paymentMethod === "fiat") {
      await handleFiatDonation(req, res, amountPhp, firstName.trim(), lastName.trim(), email);
    } else {
      await handleCryptoDonation(req, res, amountPhp, firstName.trim(), lastName.trim());
    }
  } catch (err) {
    req.log.error({ err }, "Failed to create donation");
    res.status(500).json({ error: "Failed to create payment. Please try again." });
  }
});

/**
 * HitPay webhook — receives POST (application/x-www-form-urlencoded) when a
 * payment is completed or fails.
 */
router.post("/donate/hitpay-webhook", (req, res) => {
  const salt = process.env.HITPAY_SALT;
  if (!salt) {
    req.log.error("HITPAY_SALT is not set — cannot verify webhook");
    res.status(500).send("Webhook not configured");
    return;
  }

  const payload = req.body as Record<string, string>;
  const receivedHmac = payload.hmac ?? "";

  if (!receivedHmac) {
    req.log.warn("HitPay webhook received with no HMAC");
    res.status(400).send("Missing HMAC");
    return;
  }

  let valid = false;
  try {
    valid = verifyHitPayWebhook(salt, payload, receivedHmac);
  } catch {
    valid = false;
  }

  if (!valid) {
    req.log.warn({ payload }, "HitPay webhook HMAC verification failed");
    res.status(401).send("Invalid signature");
    return;
  }

  const { status, payment_request_id, reference_number, amount, currency } = payload;
  req.log.info({ status, payment_request_id, reference_number, amount, currency }, "HitPay webhook received");

  res.status(200).send("OK");
});

/**
 * PayGate.to callback for crypto donations.
 */
router.get("/donate/callback", (req, res) => {
  const { id, txid_out, value_coin } = req.query;
  req.log.info({ id, txid_out, value_coin }, "paygate.to callback received");
  if (typeof id === "string" && pendingDonations.has(id)) {
    const d = pendingDonations.get(id)!;
    d.paidAt = new Date().toISOString();
    pendingDonations.set(id, d);
  }
  res.status(200).send("*ok*");
});

export default router;
