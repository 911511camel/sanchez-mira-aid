import { Router, type IRouter } from "express";

const router: IRouter = Router();

const PHP_TO_USD = 0.0175;

router.post("/donate", async (req, res) => {
  const { amountPhp, firstName, lastName, email } = req.body as {
    amountPhp: unknown;
    firstName: unknown;
    lastName: unknown;
    email: unknown;
  };

  if (
    typeof amountPhp !== "number" || amountPhp < 50 ||
    typeof firstName !== "string" || firstName.trim().length === 0 ||
    typeof lastName !== "string" || lastName.trim().length === 0 ||
    typeof email !== "string" || !email.includes("@")
  ) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const amountUsd = +(amountPhp * PHP_TO_USD).toFixed(2);
  const finalAmount = Math.max(amountUsd, 1);

  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) {
    req.log.error("NOWPAYMENTS_API_KEY is not set");
    res.status(500).json({ error: "Payment service not configured" });
    return;
  }

  const origin = (req.headers.origin ?? "").replace(/\/$/, "");
  const successUrl = origin ? `${origin}/thank-you` : "https://nowpayments.io";
  const cancelUrl  = origin ? `${origin}/#donate`    : "https://nowpayments.io";

  try {
    const nowPayRes = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: finalAmount,
        price_currency: "usd",
        pay_currency: "usdttrc20",
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
      res.status(502).json({ error: "Payment provider error", detail: errBody });
      return;
    }

    const data = await nowPayRes.json() as { invoice_url?: string; id?: string };
    if (!data.invoice_url) {
      req.log.error({ data }, "NOWPayments returned no invoice_url");
      res.status(502).json({ error: "Payment provider returned no checkout URL" });
      return;
    }

    res.json({ checkoutUrl: data.invoice_url, invoiceId: data.id });
  } catch (err) {
    req.log.error({ err }, "Failed to create NOWPayments invoice");
    res.status(500).json({ error: "Failed to create payment" });
  }
});

export default router;
