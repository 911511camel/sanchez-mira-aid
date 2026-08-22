import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mountain, Landmark, Church, Stethoscope, CloudRain, Waves, Trees } from "lucide-react";
import landscapeImg from "@/assets/images/sanchez-mira-landscape.png";
import villageImg from "@/assets/images/barangay-village.png";
import gatheringImg from "@/assets/images/community-gathering.png";
import healthPostImg from "@/assets/images/health-post.png";
import { useLanguage } from "@/lib/i18n";

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
  const { t } = useLanguage();

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
            {t("Where We Work")}
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
            {t("Sanchez Mira is a 3rd-class coastal municipality in the province of Cagayan, Philippines. It covers 218.77 square kilometers and has a population of over 26,000 people. Formerly called Malolokit, it was named after Spanish Brigadier General Manuel Sanchez Mira. Its people are resilient and proud — but geographic isolation and poverty mean that basic healthcare is often out of reach for the families who need it most.")}
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
            {t("The coastal municipality of Sanchez Mira, Cagayan — the landscape we serve")}
          </div>
        </motion.div>

        {/* Two-column: text facts + photo grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

          {/* Left: Facts */}
          <div>
            <h3 className="text-2xl font-bold font-serif text-primary mb-8">
              {t("Why Healthcare Here Is Different")}
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
                    <div className="font-bold text-foreground mb-1">{t(fact.label)}</div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{t(fact.value)}</p>
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
              {t("When my daughter had a high fever, the nearest clinic was a one-hour tricycle ride on a muddy road. By the time we arrived, it was dark and the doctor had already left.")}
              <footer className="mt-3 text-sm not-italic font-medium text-foreground">
                {t("— Barangay resident, Sanchez Mira")}
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

        {/* Local crisis & geographic context */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block"
            >
              {t("The Local Crisis")}
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold font-serif mb-4 text-primary"
            >
              {t("The Reality on the Ground: Distance, Climate, and Access")}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {t("Why Sanchez Mira Faces Acute Healthcare Vulnerabilities")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Distance to tertiary care */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white border border-border p-8 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-5">
                <Stethoscope size={24} />
              </div>
              <h4 className="text-xl font-bold font-serif text-primary mb-3">{t("Distance to Tertiary Care")}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t("Sanchez Mira relies on local Rural Health Units (RHUs) and district facilities for primary care. However, for specialized interventions, major trauma, surgical procedures, or advanced diagnostics, patients must travel to")}{" "}
                <strong className="text-foreground">Tuguegarao City</strong> ({" "}
                <em>Cagayan Valley Medical Center</em>). {t("This trip spans approximately")}{" "}
                <strong className="text-foreground">150–160 km</strong> {t("and takes")}{" "}
                <strong className="text-foreground">3.5–4.5 hrs</strong> {t("by road under normal conditions.")}
              </p>
            </motion.div>

            {/* Typhoon & seasonal isolation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl bg-white border border-border p-8 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <CloudRain size={24} />
              </div>
              <h4 className="text-xl font-bold font-serif text-primary mb-3">{t("Typhoon & Seasonal Isolation")}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t("Located along the northern coastline facing the Babuyan Channel, the municipality lies directly in the path of seasonal Pacific typhoons (typically July to December). Heavy rains and storm surges routinely cause flash flooding, swell river crossings, and trigger coastal road cut-offs along the Manila North Road corridor, isolating communities for days at a time.")}
              </p>
            </motion.div>
          </div>

          {/* Vulnerable & remote barangays */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white border border-border p-8 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold font-serif text-primary mb-1">{t("Vulnerable & Remote Barangays")}</h4>
                <p className="text-sm text-muted-foreground">{t("Communities most at risk when disaster strikes")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-muted/40 border border-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Waves size={18} className="text-secondary shrink-0" />
                  <h5 className="font-bold text-foreground">{t("Coastal Fisherfolk Communities")}</h5>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  <span className="font-semibold text-foreground">{t("e.g., Masisit, Bangan, Tokitok")}</span> — {t("high exposure to storm surges, wind damage, and chronic seasonal loss of income during rough seas.")}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("Basic waterborne and respiratory illnesses spike during monsoon months.")}
                </p>
              </div>
              <div className="rounded-2xl bg-muted/40 border border-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trees size={18} className="text-primary shrink-0" />
                  <h5 className="font-bold text-foreground">{t("Inland & Upland Farming Settlements")}</h5>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  <span className="font-semibold text-foreground">{t("e.g., Callungan, Kitturong, Dammang")}</span> — {t("dispersed sitios and puroks face unpaved access routes that become impassable during typhoons.")}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("Cutting off access even to the municipal town center.")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white border border-border rounded-3xl p-8 md:p-10 text-center shadow-sm"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {t("Sanchez Mira has approximately")} <strong className="text-foreground">18 barangays</strong> {t("and a population of over")}{" "}
            <strong className="text-foreground">26,000 people</strong>, {t("located about")}{" "}
            <strong className="text-foreground">632 km from Manila</strong> {t("and")}{" "}
            <strong className="text-foreground">155 km from Tuguegarao</strong>. {t("Many families live on less than ₱300 per day — meaning even a single doctor's visit, a bag of vitamins, or a course of antibiotics can be financially out of reach.")}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("The Barangay Health Support Fund was founded to close this gap — not through charity, but through consistent, dignified, community-led care.")}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
