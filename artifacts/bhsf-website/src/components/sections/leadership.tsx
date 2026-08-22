import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Landmark, HeartPulse, GraduationCap } from "lucide-react";

const details = [
  {
    icon: Landmark,
    label: "Public Office",
    value: "Vice Mayor of Sanchez-Mira, Cagayan",
  },
  {
    icon: GraduationCap,
    label: "Party",
    value: "Nacionalista Party (NP)",
  },
  {
    icon: Stethoscope,
    label: "Profession",
    value: "Medical Doctor (M.D.)",
  },
  {
    icon: HeartPulse,
    label: "Key Programs",
    value: "Mobile clinic health rollouts and local community welfare initiatives",
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block"
          >
            Our Leadership
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary"
          >
            Meet Our Fund Coordinator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            A physician and public servant dedicated to bringing healthcare closer to every barangay.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white border border-border rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-white font-serif font-bold text-3xl shrink-0">
              CS
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold font-serif mb-1">
                Dr. Connie Marie Oroceo-Sacramed
              </h3>
              <p className="text-primary-foreground/80">
                Vice Mayor of Sanchez-Mira, Cagayan — running under the Nacionalista Party (NP)
              </p>
              <p className="text-primary-foreground/80 mt-2">
                A medical doctor involved in community health and local public service programs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 md:p-10">
            {details.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    {item.label}
                  </div>
                  <p className="font-semibold text-foreground leading-snug">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
