import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HeartPulse, Languages } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
  const { scrollY } = useScroll();
  const { t, lang, toggle } = useLanguage();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(253, 251, 247, 0)", "rgba(253, 251, 247, 0.95)"]
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(8px)"]
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 50],
    ["none", "0 4px 6px -1px rgba(0, 0, 0, 0.05)"]
  );

  const scrollToDonate = () => {
    const el = document.getElementById("donate");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextLanguageLabel = lang === "en" ? "Tagalog" : lang === "tl" ? "Русский" : "English";

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter, boxShadow }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform">
            <HeartPulse size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg leading-tight text-primary">BHSF</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{t("Barangay Health Support")}</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#mission" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">{t("Mission")}</a>
          <a href="#programs" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">{t("Programs")}</a>
          <a href="#impact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">{t("Impact")}</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={toggle}
            size="sm"
            variant="outline"
            className="rounded-full gap-2 text-sm"
            aria-label="Switch language"
          >
            <Languages size={16} />
            {nextLanguageLabel}
          </Button>
          <Button onClick={scrollToDonate} size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md">
            {t("Donate Now")}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
