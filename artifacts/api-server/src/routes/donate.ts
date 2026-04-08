import { Router, type IRouter } from "express";
import crypto from "crypto";

const router: IRouter = Router();

const PAYOUT_WALLET = "0xB4c4F2DaeF5D2c0FDdd4b2c58F79EF1A1eB7A82a";
const TICKER = "polygon/usdc";
const PHP_TO_USD = 0.0175;

const pendingDonations = new Map<string, { amountPhp: number; name: string; paidAt?: string }>();

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

async function handleFiatDonation(
  req: Parameters<Parameters<IRouter["post"]>[1]>[0],
  res: Parameters<Parameters<IRouter["post"]>[1]>[1],
  amountPhp: number,
  firstName: string,
  lastName: string,
  email: string
) {
  const donationId = crypto.randomUUID();
  const addressIn = await getForwardingAddress(req, donationId);
  if (!addressIn) {
    res.status(502).json({ error: "Failed to generate payment address. Please try again." });
    return;
  }

  const amountUsd = Math.max(+(amountPhp * PHP_TO_USD).toFixed(2), 1.0);
  const checkoutUrl = `https://checkout.paygate.to/process-payment.php?address=${addressIn}&amount=${amountUsd}&provider=transak&email=${encodeURIComponent(email)}&currency=USD`;

  pendingDonations.set(donationId, { amountPhp, name: `${firstName} ${lastName}` });
  req.log.info({ donationId, amountPhp, amountUsd, addressIn }, "Fiat donation checkout created");

  res.json({ method: "fiat", checkoutUrl, donationId });
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
