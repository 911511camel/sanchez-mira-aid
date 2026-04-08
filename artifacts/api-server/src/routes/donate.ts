import { Router, type IRouter } from "express";
import crypto from "crypto";

const router: IRouter = Router();

const PAYOUT_WALLET = "TPMUHFSebNNJfoeFiusq6TBypbsJy8DByw";
const TICKER = "trc20/usdt";
const MIN_USDT = 13.3;

const pendingDonations = new Map<string, { amountPhp: number; amountUsdt: string; name: string; paidAt?: string }>();

router.post("/donate", async (req, res) => {
  const { amountPhp, firstName, lastName, email } = req.body as {
    amountPhp: unknown;
    firstName: unknown;
    lastName: unknown;
    email: unknown;
  };

  if (
    typeof amountPhp !== "number" || amountPhp < 800 ||
    typeof firstName !== "string" || firstName.trim().length === 0 ||
    typeof lastName !== "string" || lastName.trim().length === 0 ||
    typeof email !== "string" || !email.includes("@")
  ) {
    res.status(400).json({ error: "Invalid request. Minimum donation is ₱800." });
    return;
  }

  try {
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

    const amountUsdt = parseFloat(convertData.value_coin);
    if (amountUsdt < MIN_USDT) {
      res.status(400).json({
        error: `The minimum donation is approximately ₱800 (${MIN_USDT} USDT). Please increase your amount.`,
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

    pendingDonations.set(donationId, {
      amountPhp,
      amountUsdt: convertData.value_coin,
      name: `${firstName} ${lastName}`,
    });

    req.log.info({ donationId, amountPhp, amountUsdt, address: walletData.address_in }, "Donation payment created");

    res.json({
      donationId,
      addressIn: walletData.address_in,
      amountUsdt: convertData.value_coin,
      exchangeRate: convertData.exchange_rate,
      qrCode,
      network: "TRON (TRC-20)",
      ticker: "USDT",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create paygate.to donation");
    res.status(500).json({ error: "Failed to create payment. Please try again." });
  }
});

router.get("/donate/callback", (req, res) => {
  const { id, txid_out, value_coin } = req.query;
  req.log.info({ id, txid_out, value_coin }, "paygate.to payment callback received");

  if (typeof id === "string" && pendingDonations.has(id)) {
    const donation = pendingDonations.get(id)!;
    donation.paidAt = new Date().toISOString();
    pendingDonations.set(id, donation);
  }

  res.status(200).send("*ok*");
});

export default router;
