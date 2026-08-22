import { Router, type IRouter } from "express";
import crypto from "crypto";

const router: IRouter = Router();

// ---------------------------------------------------------------------------
// HitPay helpers
// ---------------------------------------------------------------------------

const HITPAY_API_BASE = "https://api.hit-pay.com/v1";

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
// NOWPayments (crypto) helpers
// ---------------------------------------------------------------------------

const NOWPAYMENTS_API_BASE = "https://api.nowpayments.io/v1";

async function handleCryptoDonation(
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
    res.status(500).json({ error: "Crypto payment service not configured." });
    return;
  }

  const origin = (req.headers.origin ?? "").replace(/\/$/, "");
  const successUrl = origin ? `${origin}/thank-you` : `${req.protocol}://${req.get("host")}/thank-you`;
  const cancelUrl  = origin ? `${origin}/#donate`    : `${req.protocol}://${req.get("host")}/#donate`;
  const ipnCallbackUrl = `${process.env.API_PUBLIC_URL ?? `${req.protocol}://${req.get("host")}`}/api/donate/nowpayments-ipn`;

  const orderDescription = `BHSF Donation — ₱${amountPhp} from ${firstName} ${lastName}`;
  const orderReference   = `BHSF-${Date.now()}`;

  const body = {
    price_amount:      amountPhp,
    price_currency:    "php",
    order_description: orderDescription,
    order_id:          orderReference,
    ipn_callback_url:  ipnCallbackUrl,
    success_url:       successUrl,
    cancel_url:        cancelUrl,
  };

  const npRes = await fetch(`${NOWPAYMENTS_API_BASE}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key":    apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!npRes.ok) {
    const errBody = await npRes.text();
    req.log.error({ status: npRes.status, body: errBody }, "NOWPayments invoice error");
    res.status(502).json({ error: "Crypto payment provider error. Please try again." });
    return;
  }

  const data = await npRes.json() as { id?: string; invoice_url?: string; token_id?: string };
  if (!data.invoice_url) {
    req.log.error({ data }, "NOWPayments returned no invoice URL");
    res.status(502).json({ error: "Crypto payment provider returned no checkout URL." });
    return;
  }

  req.log.info({ amountPhp, email, orderReference, invoiceId: data.id }, "Crypto donation invoice created via NOWPayments");
  res.json({ method: "crypto", checkoutUrl: data.invoice_url, invoiceId: data.id, orderReference });
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
    if (paymentMethod === "gcash") {
      await handleFiatDonation(req, res, amountPhp, firstName.trim(), lastName.trim(), email);
    } else if (paymentMethod === "crypto") {
      await handleCryptoDonation(req, res, amountPhp, firstName.trim(), lastName.trim(), email);
    } else {
      res.status(400).json({ error: "Invalid payment method." });
    }
  } catch (err) {
    req.log.error({ err }, "Failed to create donation");
    res.status(500).json({ error: "Failed to create payment. Please try again." });
  }
});

/**
 * HitPay webhook — application/x-www-form-urlencoded
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
 * NOWPayments IPN callback — JSON payload sent when a crypto payment is
 * completed, partially paid, or expires.
 */
router.post("/donate/nowpayments-ipn", (req, res) => {
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;

  if (ipnSecret) {
    const receivedSig = req.headers["x-nowpayments-sig"] as string | undefined;
    if (receivedSig) {
      const payload = req.body as Record<string, unknown>;
      const sorted  = JSON.stringify(
        Object.fromEntries(Object.entries(payload).sort(([a], [b]) => a.localeCompare(b)))
      );
      const expected = crypto.createHmac("sha512", ipnSecret).update(sorted).digest("hex");
      if (!crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(receivedSig, "hex"))) {
        req.log.warn("NOWPayments IPN signature mismatch");
        res.status(401).send("Invalid signature");
        return;
      }
    }
  }

  const { payment_id, payment_status, order_id, price_amount, price_currency, pay_amount, pay_currency } =
    req.body as Record<string, unknown>;

  req.log.info(
    { payment_id, payment_status, order_id, price_amount, price_currency, pay_amount, pay_currency },
    "NOWPayments IPN received"
  );

  res.status(200).send("OK");
});

export default router;
