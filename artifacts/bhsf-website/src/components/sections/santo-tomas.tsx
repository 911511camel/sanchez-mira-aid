import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mountain, Wheat, Clock } from "lucide-react";
import landscapeImg from "@/assets/images/santo-tomas-landscape.png";
import villageImg from "@/assets/images/barangay-village.png";
import gatheringImg from "@/assets/images/community-gathering.png";
import healthPostImg from "@/assets/images/health-post.png";

const facts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Cagayan Valley Region, Isabela Province — 400 km north of Manila",
  },
  {
    icon: Mountain,
    label: "Geography",
    value: "Surrounded by the Sierra Madre mountain range; rivers and seasonal flooding isolate many barangays",
  },
  {
    icon: Wheat,
    label: "Livelihood",
    value: "Primarily subsistence rice farming — seasonal income leaves little room for medical expenses",
  },
  {
    icon: Clock,
    label: "Healthcare Access",
    value: "Nearest hospital is 30–60 minutes away by road; many remote barangays have no paved access",
  },
];

export function SantoTomas() {
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
            Santo Tomas, Isabela
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Nestled in the fertile Cagayan Valley, Santo Tomas is a municipality of hardworking farming families, 
            quiet rivers, and green mountains. Its people are resilient and proud — but geographic isolation and 
            poverty mean that basic healthcare is often out of reach for the families who need it most.
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
            alt="Rice paddies and mountains of Cagayan Valley, Isabela, Philippines"
            className="w-full h-[420px] object-cover"
          />
          <div className="bg-primary/90 text-white text-sm px-6 py-3 flex items-center gap-2">
            <MapPin size={14} className="shrink-0" />
            Cagayan Valley rice paddies with the Sierra Madre range in the background — the landscape of Santo Tomas, Isabela
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
                — Barangay resident, Santo Tomas
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
                alt="Rural barangay village in Santo Tomas, Isabela"
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
            Santo Tomas has approximately <strong className="text-foreground">15 barangays</strong> spread across 
            river plains and upland areas. Many families live on less than ₱300 per day — meaning even a single 
            doctor's visit, a bag of vitamins, or a course of antibiotics can be financially out of reach.
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
