import { motion } from "framer-motion";
import { Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";

export default function ThankYou() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart size={48} className="fill-secondary text-secondary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4">
          {t("Thank You!")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t("Your donation is being processed. Once confirmed, it will go directly toward medicines, mobile doctor visits, and maternal health programs in Sanchez Mira, Cagayan. You will receive a confirmation email shortly.")}
        </p>
        <div className="p-5 rounded-2xl bg-secondary/10 border border-secondary/20 mb-8">
          <p className="text-sm font-medium text-secondary">
            {t("Funds settle to our USDT (TRC-20) wallet and are disbursed monthly to partner health workers in the barangays.")}
          </p>
        </div>
        <Link href="/">
          <Button variant="outline" className="rounded-full px-8 h-12 gap-2">
            <Home size={18} />
            {t("Back to Home")}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
