import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mountain, Landmark, Church } from "lucide-react";
import landscapeImg from "@/assets/images/sanchez-mira-landscape.png";
import villageImg from "@/assets/images/barangay-village.png";
import gatheringImg from "@/assets/images/community-gathering.png";
import healthPostImg from "@/assets/images/health-post.png";

const facts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Cagayan Valley (Region II), Cagayan Province — approx. 632 km from Manila",
  },
  {
    icon: Mountain,
    label: "Geography",
    value: "A 3rd-class coastal municipality covering 218.77 km², with 18 barangays spread across coastal plains and upland areas",
  },
  {
    icon: Landmark,
    label: "History",
    value: "Originally a Kalinga hunting ground and Spanish mission area before Ilocos settlers arrived to farm; formerly called Malolokit, officially founded and named in 1884 after Spanish Brigadier General Manuel Sanchez Mira",
  },
  {
    icon: Church,
    label: "Heritage",
    value: "Home to the historic Santa Maria Magdalena Church ruins (also known as Pata or Nagsimbaanan Church), dating back to 1595",
  },
];

export function SanchezMira() {
  return (
    <section id="community" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block"
          >
            Where We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary"
          >
            Sanchez Mira, Cagayan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Sanchez Mira is a 3rd-class coastal municipality in the province of Cagayan, Philippines.
            It covers 218.77 square kilometers and has a population of over 26,000 people. Formerly
            called Malolokit, it was named after Spanish Brigadier General Manuel Sanchez Mira.
            Its people are resilient and proud — but geographic isolation and poverty mean that
            basic healthcare is often out of reach for the families who need it most.
          </motion.p>
        </div>

        {/* Hero landscape photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden mb-12 shadow-xl"
        >
          <img
            src={landscapeImg}
            alt="Coastal landscape of Cagayan Valley, Philippines"
            className="w-full h-[420px] object-cover"
          />
          <div className="bg-primary/90 text-white text-sm px-6 py-3 flex items-center gap-2">
            <MapPin size={14} className="shrink-0" />
            The coastal municipality of Sanchez Mira, Cagayan — the landscape we serve
          </div>
        </motion.div>

        {/* Two-column: text facts + photo grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

          {/* Left: Facts */}
          <div>
            <h3 className="text-2xl font-bold font-serif text-primary mb-8">
              Why Healthcare Here Is Different
            </h3>
            <div className="space-y-6">
              {facts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <fact.icon size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">{fact.label}</div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{fact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 border-l-4 border-secondary pl-6 text-muted-foreground italic text-lg leading-relaxed"
            >
              "When my daughter had a high fever, the nearest clinic was a one-hour tricycle ride on a muddy road. 
              By the time we arrived, it was dark and the doctor had already left."
              <footer className="mt-3 text-sm not-italic font-medium text-foreground">
                — Barangay resident, Sanchez Mira
              </footer>
            </motion.blockquote>
          </div>

          {/* Right: photo grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden col-span-2"
            >
              <img
                src={villageImg}
                alt="Rural barangay village in Sanchez Mira, Cagayan"
                className="w-full h-52 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={gatheringImg}
                alt="Community gathering in a barangay"
                className="w-full h-44 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={healthPostImg}
                alt="Rural barangay health post"
                className="w-full h-44 object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white border border-border rounded-3xl p-8 md:p-10 text-center shadow-sm"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Sanchez Mira has approximately <strong className="text-foreground">18 barangays</strong> and a
            population of over <strong className="text-foreground">26,000 people</strong>, located about
            <strong className="text-foreground"> 632 km from Manila</strong> and{" "}
            <strong className="text-foreground">155 km from Tuguegarao</strong>. Many families live on less
            than ₱300 per day — meaning even a single doctor's visit, a bag of vitamins, or a course of
            antibiotics can be financially out of reach.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Barangay Health Support Fund was founded to close this gap — not through charity, 
            but through consistent, dignified, community-led care.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
