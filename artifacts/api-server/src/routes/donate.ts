import { Router, type IRouter } from "express";
import crypto from "crypto";

const router: IRouter = Router();

const PAYOUT_WALLET = "0xB4c4F2DaeF5D2c0FDdd4b2c58F79EF1A1eB7A82a";
const TICKER = "polygon/usdc";
const MIN_USDC = 1.0;
const PHP_TO_USD = 0.0175;

const pendingDonations = new Map<string, { amountPhp: number; name: string; paidAt?: string }>();

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

  const amountUsdc = parseFloat(convertData.value_coin);
  if (amountUsdc < MIN_USDC) {
    res.status(400).json({
      error: `Minimum donation is ₱60 (~${MIN_USDC} USDC). Please increase your amount.`,
    });
    return;
  }

  const donationId = crypto.randomUUID();
  const apiBase = process.env.API_PUBLIC_URL ?? `${req.protocol}://${req.get("host")}`;
  const callbackUrl = `${apiBase}/api/donate/callback?id=${donationId}`;

  const walletRes = await fetch(
    `https://api.paygate.to/crypto/${TICKER}/wallet.php?address=${PAYOUT_WALLET}&callback=${encodeURIComponent(callbackUrl)}`
  );
  if (!walletRes.ok) {
    req.log.error({ status: walletRes.status }, "paygate.to wallet generation failed");
    res.status(502).json({ error: "Failed to generate payment address. Please try again." });
    return;
  }
  const walletData = await walletRes.json() as { address_in?: string };
  if (!walletData.address_in) {
    req.log.error({ walletData }, "paygate.to returned no address_in");
    res.status(502).json({ error: "Payment provider returned no address." });
    return;
  }

  const qrRes = await fetch(
    `https://api.paygate.to/crypto/${TICKER}/qrcode.php?address=${walletData.address_in}`
  );
  let qrCode: string | null = null;
  if (qrRes.ok) {
    const qrData = await qrRes.json() as { status: string; qr_code?: string };
    if (qrData.status === "success" && qrData.qr_code) {
      qrCode = qrData.qr_code;
    }
  }

  pendingDonations.set(donationId, { amountPhp, name: `${firstName} ${lastName}` });
  req.log.info({ donationId, amountPhp, amountUsdc, address: walletData.address_in }, "Crypto donation created");

  res.json({
    method: "crypto",
    donationId,
    addressIn: walletData.address_in,
    amountCoin: convertData.value_coin,
    exchangeRate: convertData.exchange_rate,
    qrCode,
    network: "Polygon",
    ticker: "USDC",
  });
}

async function handleFiatDonation(
  req: Parameters<Parameters<IRouter["post"]>[1]>[0],
  res: Parameters<Parameters<IRouter["post"]>[1]>[1],
  amountPhp: number,
  firstName: string,
  lastName: string,
  email: string
) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) {
    req.log.error("NOWPAYMENTS_API_KEY is not set");
    res.status(500).json({ error: "Fiat payment service not configured." });
    return;
  }

  const amountUsd = +(amountPhp * PHP_TO_USD).toFixed(2);
  const finalAmount = Math.max(amountUsd, 1);

  const origin = (req.headers.origin ?? "").replace(/\/$/, "");
  const successUrl = origin ? `${origin}/thank-you` : "https://nowpayments.io";
  const cancelUrl  = origin ? `${origin}/#donate`    : "https://nowpayments.io";

  const nowPayRes = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: finalAmount,
      price_currency: "usd",
      pay_currency: "usdcmatic",
      order_description: `BHSF Donation — PHP ${amountPhp} — ${firstName} ${lastName}`,
      order_id: `BHSF-${Date.now()}`,
      customer_email: email,
      is_fixed_rate: true,
      is_fee_paid_by_user: false,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });

  if (!nowPayRes.ok) {
    const errBody = await nowPayRes.text();
    req.log.error({ status: nowPayRes.status, body: errBody }, "NOWPayments error");
    res.status(502).json({ error: "Payment provider error. Please try again." });
    return;
  }

  const data = await nowPayRes.json() as { invoice_url?: string; id?: string };
  if (!data.invoice_url) {
    req.log.error({ data }, "NOWPayments returned no invoice_url");
    res.status(502).json({ error: "Payment provider returned no checkout URL." });
    return;
  }

  req.log.info({ amountPhp, amountUsd, email }, "Fiat donation invoice created");
  res.json({ method: "fiat", checkoutUrl: data.invoice_url, invoiceId: data.id });
}

router.post("/donate", async (req, res) => {
  const { amountPhp, firstName, lastName, email, paymentMethod } = req.body as {
    amountPhp: unknown;
    firstName: unknown;
    lastName: unknown;
    email: unknown;
    paymentMethod: unknown;
  };

  const method = paymentMethod === "fiat" ? "fiat" : "crypto";
  const minAmount = 50;

  if (
    typeof amountPhp !== "number" || amountPhp < minAmount ||
    typeof firstName !== "string" || firstName.trim().length === 0 ||
    typeof lastName !== "string" || lastName.trim().length === 0 ||
    typeof email !== "string" || !email.includes("@")
  ) {
    res.status(400).json({ error: `Invalid request. Minimum donation is ₱${minAmount}.` });
    return;
  }

  try {
    if (method === "fiat") {
      await handleFiatDonation(req, res, amountPhp, firstName.trim(), lastName.trim(), email);
    } else {
      await handleCryptoDonation(req, res, amountPhp, firstName.trim(), lastName.trim());
    }
  } catch (err) {
    req.log.error({ err }, "Failed to create donation");
    res.status(500).json({ error: "Failed to create payment. Please try again." });
  }
});

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
