import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const tiers = [
  { amount: 250, usd: 5, impact: "Provides a month of vitamins for one child" },
  { amount: 500, usd: 10, impact: "Funds one home doctor visit" },
  { amount: 1000, usd: 20, impact: "Supplies a full medicine kit for a family" },
  { amount: 2500, usd: 50, impact: "Sponsors one mobile clinic day in a barangay" }
];

const paymentMethods = [
  "GCash", "Maya", "PayPal", "Stripe (Card)", "Bank Transfer (BDO/BPI)", "Crypto"
];

export function Donation() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("GCash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const currentImpact = selectedAmount === "custom" 
    ? "Every contribution brings healthcare closer to those who need it."
    : tiers.find(t => t.amount === selectedAmount)?.impact;

  return (
    <section id="donate" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto">
          
          {/* Left Column: Context */}
          <div className="w-full lg:w-5/12 pt-8">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Take Action</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary">
              Make a Difference Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your generosity directly translates to medicines, doctor visits, and better health for families in Santo Tomas. We ensure every peso is stretched to maximize impact in the barangays.
            </p>
            
            <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20">
              <h3 className="font-bold text-secondary text-xl mb-4 flex items-center gap-2">
                <Heart className="fill-secondary" size={20} />
                The Impact of Your Gift
              </h3>
              <ul className="space-y-4">
                {tiers.map((tier) => (
                  <li key={tier.amount} className="flex gap-3">
                    <span className="font-bold text-primary whitespace-nowrap min-w-[100px]">
                      ₱{tier.amount}
                    </span>
                    <span className="text-muted-foreground">{tier.impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full lg:w-7/12">
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                {showSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart size={40} className="fill-secondary" />
                    </div>
                    <h3 className="text-3xl font-bold font-serif text-primary mb-4">Thank You!</h3>
                    <p className="text-lg text-muted-foreground mb-8">
                      Your commitment to better health in our barangays means the world. We will contact you shortly to complete the donation.
                    </p>
                    <Button onClick={() => setShowSuccess(false)} variant="outline" className="rounded-full">
                      Make Another Donation
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Amount Selection */}
                    <div>
                      <Label className="text-lg font-bold text-primary mb-4 block">Select Amount (PHP)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {tiers.map((tier) => (
                          <button
                            key={tier.amount}
                            type="button"
                            onClick={() => setSelectedAmount(tier.amount)}
                            className={`py-4 px-2 rounded-2xl border-2 font-bold text-lg transition-all ${
                              selectedAmount === tier.amount 
                                ? 'border-primary bg-primary text-white shadow-md' 
                                : 'border-border text-foreground hover:border-primary/50'
                            }`}
                          >
                            ₱{tier.amount.toLocaleString()}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setSelectedAmount("custom")}
                          className={`py-4 px-2 rounded-2xl border-2 font-bold text-lg transition-all ${
                            selectedAmount === "custom" 
                              ? 'border-primary bg-primary text-white shadow-md' 
                              : 'border-border text-foreground hover:border-primary/50'
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
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₱</span>
                            <Input 
                              type="number" 
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              placeholder="Enter custom amount" 
                              className="pl-8 h-14 text-lg rounded-xl"
                              required={selectedAmount === "custom"}
                              min="50"
                            />
                          </div>
                        </motion.div>
                      )}

                      <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-start gap-3">
                        <Info className="text-accent shrink-0 mt-0.5" size={18} />
                        <p className="text-sm font-medium text-primary">{currentImpact}</p>
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required className="h-12 rounded-xl" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required className="h-12 rounded-xl" />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4">
                      <Label className="text-lg font-bold text-primary block">Payment Method</Label>
                      
                      <Alert className="bg-blue-50 text-blue-900 border-blue-200 mb-4">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertTitle>Secure payment integration coming soon</AlertTitle>
                        <AlertDescription>
                          Select your preferred method below and submit. We will email you the direct payment details.
                        </AlertDescription>
                      </Alert>

                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-3">
                        {paymentMethods.map((method) => (
                          <div key={method} className="flex items-center space-x-2 border rounded-xl p-3 hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value={method} id={method} />
                            <Label htmlFor={method} className="cursor-pointer flex-1 font-medium">{method}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      className="w-full h-16 text-xl rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-xl"
                      disabled={isSubmitting || (selectedAmount === "custom" && !customAmount)}
                    >
                      {isSubmitting ? "Processing..." : `Donate ${selectedAmount === "custom" && customAmount ? `₱${customAmount}` : selectedAmount !== "custom" ? `₱${selectedAmount.toLocaleString()}` : ""}`}
                    </Button>

                  </form>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
