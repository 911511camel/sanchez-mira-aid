import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Shield, AlertCircle, Loader2 } from "lucide-react";

const tiers = [
  { amount: 250, usd: 5, impact: "Provides a month of vitamins for one child" },
  { amount: 500, usd: 10, impact: "Funds one home doctor visit" },
  { amount: 1000, usd: 20, impact: "Supplies a full medicine kit for a family" },
  { amount: 2500, usd: 50, impact: "Sponsors one mobile clinic day in a barangay" },
];

const paymentIcons = [
  { label: "GCash", icon: "💚" },
  { label: "Maya", icon: "💙" },
  { label: "Card", icon: "💳" },
  { label: "Crypto", icon: "₿" },
  { label: "Bank", icon: "🏦" },
  { label: "PayPal", icon: "🅿" },
];

export function Donation() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amountPhp =
    selectedAmount === "custom" ? Number(customAmount) : selectedAmount;

  const currentImpact =
    selectedAmount === "custom"
      ? "Every contribution brings healthcare closer to those who need it."
      : tiers.find((t) => t.amount === selectedAmount)?.impact;

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
        body: JSON.stringify({ amountPhp, firstName, lastName, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Payment could not be created. Please try again.");
      }

      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setIsSubmitting(false);
    }
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
                {tiers.map((tier) => (
                  <li key={tier.amount} className="flex gap-3">
                    <span className="font-bold text-primary whitespace-nowrap min-w-[100px]">
                      ₱{tier.amount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">{tier.impact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
              <Shield size={20} className="text-secondary shrink-0" />
              <p className="text-sm text-muted-foreground">
                Payments are securely processed by{" "}
                <span className="font-semibold text-foreground">NOWPayments</span>.
                You can pay by card, GCash, Maya, bank transfer, PayPal, or
                any cryptocurrency. Donations settle to our USDT wallet.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {paymentIcons.map((p) => (
                <span
                  key={p.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white text-sm font-medium"
                >
                  <span>{p.icon}</span> {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full lg:w-7/12">
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8" data-testid="donation-form">

                  {/* Amount Selection */}
                  <div>
                    <Label className="text-lg font-bold text-primary mb-4 block">
                      Select Amount (PHP)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
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
                      <button
                        type="button"
                        data-testid="tier-custom"
                        onClick={() => setSelectedAmount("custom")}
                        className={`py-4 px-2 rounded-2xl border-2 font-bold text-lg transition-all ${
                          selectedAmount === "custom"
                            ? "border-primary bg-primary text-white shadow-md"
                            : "border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        Custom
                      </button>
                    </div>

                    {selectedAmount === "custom" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3"
                      >
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                            ₱
                          </span>
                          <Input
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="pl-8 h-14 text-lg rounded-xl"
                            min="50"
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

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-16 text-xl rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-xl"
                    disabled={isSubmitting || (selectedAmount === "custom" && !customAmount)}
                    data-testid="button-donate"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="animate-spin" size={22} />
                        Creating payment…
                      </span>
                    ) : (
                      `Donate ${
                        selectedAmount === "custom" && customAmount
                          ? `₱${Number(customAmount).toLocaleString()}`
                          : selectedAmount !== "custom"
                          ? `₱${selectedAmount.toLocaleString()}`
                          : ""
                      }`
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    You will be redirected to a secure NOWPayments checkout page.
                    Pay by card, GCash, Maya, bank transfer, PayPal, or crypto.
                    Funds settle to our verified USDT (TRC-20) wallet.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
