import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
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
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Barangay Health Support</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#mission" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Mission</a>
          <a href="#programs" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Programs</a>
          <a href="#impact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Impact</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button onClick={scrollToDonate} size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md">
            Donate Now
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
