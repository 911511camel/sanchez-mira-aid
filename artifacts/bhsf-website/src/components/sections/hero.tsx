import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/images/hero.png";
import { HeartHandshake } from "lucide-react";

export function Hero() {
  const scrollToDonate = () => {
    const el = document.getElementById("donate");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Filipino doctor reassuring a rural family" 
          className="w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-20">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent font-medium text-sm mb-6 backdrop-blur-sm"
          >
            <HeartHandshake size={16} />
            <span>Sanchez Mira, Cagayan</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white leading-[1.1] mb-6"
          >
            Better Health for Every Barangay
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-xl font-light"
          >
            No family should have to choose between their next meal and essential medicine. Help us bring care directly to rural communities.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button onClick={scrollToDonate} size="lg" className="h-14 px-8 text-lg rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:scale-105 transition-transform">
              Make a Donation
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm transition-all" asChild>
              <a href="#mission">Learn More</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
