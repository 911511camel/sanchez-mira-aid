import React from "react";
import { motion } from "framer-motion";
import { Leaf, Sun, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Mission() {
  const { t } = useLanguage();

  return (
    <section id="mission" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary"
          >
            {t("Our Mission")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground font-serif italic leading-relaxed"
          >
            {t("To improve healthcare access and quality of life in rural barangays of Sanchez Mira, Cagayan, Philippines.")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Leaf,
              title: "Rooted in Community",
              description: "We work directly with barangay captains and local health workers to ensure aid reaches those who need it most."
            },
            {
              icon: Sun,
              title: "Warm & Trustworthy",
              description: "Healthcare shouldn't feel institutional. We bring a human touch, treating every patient with dignity and deep care."
            },
            {
              icon: Users,
              title: "Sustainable Impact",
              description: "Beyond one-time visits, we establish ongoing support systems to monitor and maintain the health of rural families."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{t(item.title)}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(item.description)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
