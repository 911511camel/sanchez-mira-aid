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
  Smartphone,
  Bitcoin,
  Copy,
  CheckCircle,
} from "lucide-react";

type PaymentMethod = "gcash" | "crypto";

const GCASH_NUMBER = "09175320080";

const donationTiers = [
  { amount: 250, impact: "Provides a month of vitamins for one child" },
  { amount: 500, impact: "Funds one home doctor visit" },
  { amount: 1000, impact: "Supplies a full medicine kit for a family" },
  { amount: 2500, impact: "Sponsors one mobile clinic day in a barangay" },
];

function DonationForm({ paymentMethod }: { paymentMethod: PaymentMethod }) {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(donationTiers[0].amount);
  const [customAmount, setCustomAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const amountPhp = selectedAmount === "custom" ? Number(customAmount) : selectedAmount;
  const currentImpact =
    selectedAmount === "custom"
      ? "Every contribution brings healthcare closer to those who need it."
      : donationTiers.find((t) => t.amount === selectedAmount)?.impact;

  const copyGcashNumber = async () => {
    try {
      await navigator.clipboard.writeText(GCASH_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch { /* ignore */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!amountPhp || amountPhp < 50) {
      setError("Please enter an amount of at least ₱50.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountPhp, firstName, lastName, email, paymentMethod }),
      });

      const data = await res.json() as { checkoutUrl?: string; error?: string };

      if (!res.ok) throw new Error(data.error ?? "Payment could not be created. Please try again.");

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned. Please try again.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
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

  const redirectingLabel = paymentMethod === "gcash"
    ? "Redirecting to GCash…"
    : "Opening NOWPayments checkout…";

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
      <div>
        <Label className="text-lg font-bold text-primary mb-4 block">Select Amount (PHP)</Label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {donationTiers.map((tier) => (
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
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₱</span>
              <Input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Minimum ₱50"
                className="pl-8 h-14 text-lg rounded-xl"
                min={50}
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

      {paymentMethod === "gcash" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-secondary/10 border border-secondary/20"
          data-testid="gcash-details"
        >
          <Label className="text-lg font-bold text-secondary block mb-1">
            Pay via GCash
          </Label>
          <p className="text-sm text-muted-foreground mb-3">
            Send your donation to this GCash number:
          </p>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white border border-border px-5 py-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">GCash Number</p>
              <p className="font-mono text-2xl font-bold text-foreground tracking-wider">
                {GCASH_NUMBER}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyGcashNumber}
              className="gap-2 rounded-xl shrink-0"
            >
              {copied ? (
                <><CheckCircle size={14} className="text-green-600" /><span className="text-green-600">Copied</span></>
              ) : (
                <><Copy size={14} />Copy</>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            After sending, complete the form below and submit to confirm your donation.
          </p>
        </motion.div>
      )}

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
            {redirectingLabel}
          </span>
        ) : donateLabel}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        {paymentMethod === "gcash" && `Donate to GCash ${GCASH_NUMBER}, then complete the form below to confirm.`}
        {paymentMethod === "crypto" && "Redirects to NOWPayments secure checkout. Pay with Bitcoin, Ethereum, USDT, USDC, and 100+ other cryptocurrencies."}
      </p>
    </motion.form>
  );
}

export function Donation() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gcash");

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
              better health for families in Sanchez Mira. Every peso is stretched to
              maximize impact in the barangays.
            </p>

            <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20 mb-6">
              <h3 className="font-bold text-secondary text-xl mb-4 flex items-center gap-2">
                <Heart className="fill-secondary" size={20} />
                The Impact of Your Gift
              </h3>
              <ul className="space-y-4">
                {donationTiers.map((tier) => (
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
                GCash donations via{" "}
                <span className="font-semibold text-foreground">HitPay</span>.{" "}
                Crypto donations via{" "}
                <span className="font-semibold text-foreground">NOWPayments</span>,
                supporting 100+ cryptocurrencies worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "GCash", desc: "via GCash tab" },
                { label: "GCash QR / Cash-in", desc: "via GCash tab" },
                { label: "Bitcoin / Ethereum", desc: "via crypto tab" },
                { label: "USDT / USDC / 100+", desc: "via crypto tab" },
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

                <div className="grid grid-cols-2 rounded-2xl border border-border bg-muted/30 p-1 mb-8 gap-1">
                  {([
                    { key: "gcash",  icon: <Smartphone size={15} />, label: "GCash" },
                    { key: "crypto", icon: <Bitcoin size={15} />,    label: "Crypto" },
                  ] as { key: PaymentMethod; icon: React.ReactNode; label: string }[]).map(({ key, icon, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPaymentMethod(key)}
                      data-testid={`tab-${key}`}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-semibold text-xs transition-all ${
                        paymentMethod === key
                          ? "bg-white shadow-md text-primary border border-border"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <DonationForm
                    key="donation-form"
                    paymentMethod={paymentMethod}
                  />
                </AnimatePresence>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
