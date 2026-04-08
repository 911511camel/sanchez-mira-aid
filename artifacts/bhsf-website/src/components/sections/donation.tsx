import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Heart,
  Shield,
  AlertCircle,
  Loader2,
  Copy,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  CreditCard,
  Bitcoin,
} from "lucide-react";

type PaymentMethod = "fiat" | "crypto";

const fiatTiers = [
  { amount: 250, impact: "Provides a month of vitamins for one child" },
  { amount: 500, impact: "Funds one home doctor visit" },
  { amount: 1000, impact: "Supplies a full medicine kit for a family" },
  { amount: 2500, impact: "Sponsors one mobile clinic day in a barangay" },
];

const cryptoTiers = [
  { amount: 1000, impact: "Supplies a full medicine kit for a family" },
  { amount: 2500, impact: "Sponsors one mobile clinic day in a barangay" },
  { amount: 5000, impact: "Funds a month of community health outreach" },
  { amount: 10000, impact: "Provides essential equipment for a health post" },
];

interface CryptoPaymentDetails {
  method: "crypto";
  donationId: string;
  addressIn: string;
  amountUsdt: string;
  exchangeRate: string;
  qrCode: string | null;
  network: string;
  ticker: string;
}

function CryptoPaymentStep({
  amountPhp,
  payment,
  onBack,
  onDone,
}: {
  amountPhp: number;
  payment: CryptoPaymentDetails;
  onBack: () => void;
  onDone: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(payment.addressIn);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      /* ignore */
    }
  };

  return (
    <motion.div
      key="crypto-payment"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        Change amount
      </button>

      <div className="text-center pb-4 border-b border-border">
        <p className="text-sm text-muted-foreground mb-1">Sending donation of</p>
        <p className="text-4xl font-bold text-primary">
          ₱{amountPhp.toLocaleString()}
        </p>
        <p className="text-lg text-secondary font-semibold mt-1">
          = {payment.amountUsdt} USDT
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {payment.network} &bull; Rate: 1 USDT = ₱{(1 / parseFloat(payment.exchangeRate)).toFixed(2)}
        </p>
      </div>

      <div className="space-y-3">
        <p className="font-bold text-primary text-sm uppercase tracking-wider">
          Send {payment.amountUsdt} USDT to this address:
        </p>

        <div className="bg-muted/50 rounded-2xl border border-border p-4">
          <p className="font-mono text-sm break-all text-foreground leading-relaxed mb-3 select-all">
            {payment.addressIn}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyAddress}
            className="w-full gap-2 rounded-xl"
          >
            {copied ? (
              <>
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-green-600">Address Copied</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Address
              </>
            )}
          </Button>
        </div>

        {payment.qrCode && (
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-2xl border border-border inline-block">
              <img
                src={`data:image/png;base64,${payment.qrCode}`}
                alt="Payment QR Code"
                className="w-40 h-40"
              />
              <p className="text-xs text-center text-muted-foreground mt-2">Scan with your wallet app</p>
            </div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 space-y-1">
          <p className="font-semibold">Important</p>
          <ul className="list-disc list-inside space-y-1 text-amber-800">
            <li>Send only <strong>USDT on TRON (TRC-20)</strong> network</li>
            <li>Send the exact amount: <strong>{payment.amountUsdt} USDT</strong></li>
            <li>Funds are automatically forwarded to the BHSF wallet</li>
            <li>Confirmations typically take 1–3 minutes</li>
          </ul>
        </div>
      </div>

      <Button
        type="button"
        onClick={onDone}
        className="w-full h-14 text-lg rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-xl gap-2"
      >
        <CheckCircle size={20} />
        I Have Sent the Payment
      </Button>

      <div className="flex justify-center">
        <a
          href={`https://tronscan.org/#/address/${payment.addressIn}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink size={12} />
          View address on TRONSCAN
        </a>
      </div>
    </motion.div>
  );
}

function DonationForm({
  paymentMethod,
  onSuccess,
}: {
  paymentMethod: PaymentMethod;
  onSuccess: (data: CryptoPaymentDetails | null, amountPhp: number) => void;
}) {
  const tiers = paymentMethod === "fiat" ? fiatTiers : cryptoTiers;
  const minAmount = paymentMethod === "fiat" ? 50 : 800;

  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(tiers[0].amount);
  const [customAmount, setCustomAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amountPhp = selectedAmount === "custom" ? Number(customAmount) : selectedAmount;
  const currentImpact =
    selectedAmount === "custom"
      ? "Every contribution brings healthcare closer to those who need it."
      : tiers.find((t) => t.amount === selectedAmount)?.impact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!amountPhp || amountPhp < minAmount) {
      setError(`Please enter an amount of at least ₱${minAmount.toLocaleString()}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountPhp, firstName, lastName, email, paymentMethod }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Payment could not be created. Please try again.");
      }

      if (data.method === "fiat") {
        window.location.href = data.checkoutUrl;
      } else {
        onSuccess(data as CryptoPaymentDetails, amountPhp);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const donateLabel = (() => {
    if (selectedAmount === "custom" && customAmount)
      return `Donate ₱${Number(customAmount).toLocaleString()}`;
    if (selectedAmount !== "custom")
      return `Donate ₱${selectedAmount.toLocaleString()}`;
    return "Donate";
  })();

  return (
    <motion.form
      key={`form-${paymentMethod}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onSubmit={handleSubmit}
      className="space-y-8"
      data-testid="donation-form"
    >
      {/* Amount Selection */}
      <div>
        <Label className="text-lg font-bold text-primary mb-4 block">
          Select Amount (PHP)
        </Label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {tiers.map((tier) => (
            <button
              key={tier.amount}
              type="button"
              data-testid={`tier-${tier.amount}`}
              onClick={() => setSelectedAmount(tier.amount)}
              className={`py-4 px-2 rounded-2xl border-2 font-bold text-lg transition-all ${
                selectedAmount === tier.amount
                  ? "border-primary bg-primary text-white shadow-md"
                  : "border-border text-foreground hover:border-primary/50"
              }`}
            >
              ₱{tier.amount.toLocaleString()}
            </button>
          ))}
        </div>
        <button
          type="button"
          data-testid="tier-custom"
          onClick={() => setSelectedAmount("custom")}
          className={`w-full py-4 px-2 rounded-2xl border-2 font-bold text-lg transition-all ${
            selectedAmount === "custom"
              ? "border-primary bg-primary text-white shadow-md"
              : "border-border text-foreground hover:border-primary/50"
          }`}
        >
          Custom Amount
        </button>

        {selectedAmount === "custom" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3"
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₱</span>
              <Input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder={`Minimum ₱${minAmount.toLocaleString()}`}
                className="pl-8 h-14 text-lg rounded-xl"
                min={minAmount}
                data-testid="input-custom-amount"
              />
            </div>
          </motion.div>
        )}

        {currentImpact && (
          <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-start gap-3">
            <Heart className="text-accent shrink-0 mt-0.5 fill-accent/40" size={18} />
            <p className="text-sm font-medium text-primary">{currentImpact}</p>
          </div>
        )}
      </div>

      {/* Personal Details */}
      <div className="space-y-4">
        <Label className="text-lg font-bold text-primary block">Your Details</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="h-12 rounded-xl"
              data-testid="input-first-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="h-12 rounded-xl"
              data-testid="input-last-name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 rounded-xl"
            data-testid="input-email"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-16 text-xl rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-xl"
        disabled={isSubmitting || (selectedAmount === "custom" && !customAmount)}
        data-testid="button-donate"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-3">
            <Loader2 className="animate-spin" size={22} />
            {paymentMethod === "fiat" ? "Redirecting to checkout…" : "Generating payment address…"}
          </span>
        ) : donateLabel}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        {paymentMethod === "fiat"
          ? "You will be redirected to a secure checkout. Pay by card, GCash, Maya, bank transfer, or PayPal. Funds settle to our verified USDT wallet."
          : "You will receive a unique USDT wallet address to send from any crypto wallet. Minimum ₱1,000. Processed by PayGate.to."}
      </p>
    </motion.form>
  );
}

export function Donation() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("fiat");
  const [step, setStep] = useState<"form" | "crypto-payment">("form");
  const [cryptoPayment, setCryptoPayment] = useState<CryptoPaymentDetails | null>(null);
  const [donationAmountPhp, setDonationAmountPhp] = useState(0);

  const handleFormSuccess = (data: CryptoPaymentDetails | null, amountPhp: number) => {
    if (data) {
      setCryptoPayment(data);
      setDonationAmountPhp(amountPhp);
      setStep("crypto-payment");
    }
  };

  const handleBack = () => {
    setStep("form");
    setCryptoPayment(null);
  };

  const handleDone = () => {
    window.location.href = "/thank-you";
  };

  const handleMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setStep("form");
    setCryptoPayment(null);
  };

  return (
    <section id="donate" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto">

          {/* Left Column */}
          <div className="w-full lg:w-5/12 pt-8">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">
              Take Action
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary">
              Make a Difference Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your generosity directly translates to medicines, doctor visits, and
              better health for families in Santo Tomas. Every peso is stretched to
              maximize impact in the barangays.
            </p>

            <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20 mb-6">
              <h3 className="font-bold text-secondary text-xl mb-4 flex items-center gap-2">
                <Heart className="fill-secondary" size={20} />
                The Impact of Your Gift
              </h3>
              <ul className="space-y-4">
                {fiatTiers.map((tier) => (
                  <li key={tier.amount} className="flex gap-3">
                    <span className="font-bold text-primary whitespace-nowrap min-w-[100px]">
                      ₱{tier.amount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">{tier.impact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border mb-4">
              <Shield size={20} className="text-secondary shrink-0" />
              <p className="text-sm text-muted-foreground">
                Fiat payments via{" "}
                <span className="font-semibold text-foreground">NOWPayments</span>{" "}
                and crypto via{" "}
                <span className="font-semibold text-foreground">PayGate.to</span>.
                All donations settle as USDT to our verified TRC-20 fund wallet.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "GCash", desc: "via card tab" },
                { label: "Maya", desc: "via card tab" },
                { label: "Credit Card", desc: "via card tab" },
                { label: "PayPal", desc: "via card tab" },
                { label: "Bank Transfer", desc: "via card tab" },
                { label: "USDT (TRC-20)", desc: "via crypto tab" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col px-3 py-2 rounded-xl border border-border bg-white text-sm"
                >
                  <span className="font-semibold text-foreground">{p.label}</span>
                  <span className="text-xs text-muted-foreground">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-7/12">
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">

                {/* Payment Method Toggle — only show when on form step */}
                {step === "form" && (
                  <div className="flex rounded-2xl border border-border bg-muted/30 p-1 mb-8 gap-1">
                    <button
                      type="button"
                      onClick={() => handleMethodChange("fiat")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                        paymentMethod === "fiat"
                          ? "bg-white shadow-md text-primary border border-border"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      data-testid="tab-fiat"
                    >
                      <CreditCard size={17} />
                      Card / GCash / Maya
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMethodChange("crypto")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                        paymentMethod === "crypto"
                          ? "bg-white shadow-md text-primary border border-border"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      data-testid="tab-crypto"
                    >
                      <Bitcoin size={17} />
                      Crypto (USDT)
                    </button>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {step === "form" && (
                    <DonationForm
                      key={paymentMethod}
                      paymentMethod={paymentMethod}
                      onSuccess={handleFormSuccess}
                    />
                  )}

                  {step === "crypto-payment" && cryptoPayment && (
                    <CryptoPaymentStep
                      amountPhp={donationAmountPhp}
                      payment={cryptoPayment}
                      onBack={handleBack}
                      onDone={handleDone}
                    />
                  )}
                </AnimatePresence>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
