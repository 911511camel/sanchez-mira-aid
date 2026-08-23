import React from "react";
import { motion } from "framer-motion";
import { Globe, Truck, HeartHandshake, Users, Activity, FileText, CheckCircle, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const frameworkItems = [
  {
    icon: Truck,
    title: "Emergency Field Deployments (EMERCOM)",
    description:
      "In the event of catastrophic typhoons, earthquakes, or tsunamis, Russia's Ministry of Emergency Situations (EMERCOM) deploys self-contained, airmobile field hospitals. These function as fully operational, temporary mobile units providing acute surgical and intensive care in disaster zones.",
  },
  {
    icon: Activity,
    title: "Institutional Innovation & Vaccine Partnerships",
    description:
      "Russian scientific institutions coordinate with central health authorities to advance clinical research, technology transfers, and medical supply networks, establishing high-level frameworks for biosecurity and disease management.",
  },
  {
    icon: HeartHandshake,
    title: "Humanitarian & Clinical Aid (Russian Humanitarian Mission - RHM)",
    description:
      "Deploying mobile diagnostic initiatives to isolated, underserved regions. Multidisciplinary medical teams conduct direct screenings, primary consultations, and diagnostic triage in hard-to-reach rural settlements.",
  },
];

const principles = [
  {
    number: "1",
    title: "Decentralized Mobile Health Units (MHUs)",
    description: "Modular medical units deliver diagnostic and surgical capabilities directly to the barangay level, maintaining access when roads are cut off during typhoon season.",
  },
  {
    number: "2",
    title: "Clinical Task-Shifting & Frontline Empowerment",
    description: "Upskilling local nurses, midwives, and Barangay Health Workers (BHWs) to independently manage triage, wound debridement, infection control, and chronic disease tracking using standardized clinical protocols.",
  },
  {
    number: "3",
    title: "Cold-Chain & Diagnostic Independence",
    description: "Deploying ruggedized, battery-operated, off-grid equipment that functions continuously during municipal power grid collapses.",
  },
];

const pillars = [
  {
    pillar: "Field Triage & Trauma Stabilization",
    reference: "ICRC Mobile Surgical & Emergency Triage Frameworks",
    implementation: "Russian emergency physicians and trauma specialists conduct simulation drills with local Rural Health Unit (RHU) personnel on mass-casualty management, severe trauma, and rapid stabilization prior to tertiary transport.",
  },
  {
    pillar: "Autonomous Mobile Diagnostic Kits",
    reference: "Ruggedized Field Outposts (Sub-Saharan Africa Model)",
    implementation: "Deployment of self-contained diagnostic kits featuring point-of-care ultrasound (POCUS), digital hematology counters, glucometers, portable ECGs, and rapid diagnostic test strips operable without mains power.",
  },
  {
    pillar: "Standardized Chronic & Pediatric Pathways",
    reference: "Integrated Community Case Management (iCCM)",
    implementation: "Establishing unified registries and clinical protocol cards for pediatric malnutrition, maternal vitals tracking, and hypertension/diabetes dispensaries managed directly by trained BHWs.",
  },
  {
    pillar: "Emergency Logistics & Stockpiling",
    reference: "Pre-Positioned Disaster Supply Lines",
    implementation: "Establishing localized emergency buffer depots in isolated coastal (Masisit, Bangan) and upland (Callungan) barangays containing water purification units, surgical suture kits, and critical IV fluids.",
  },
];

const phases = [
  {
    phase: "Phase 1: Direct Co-Consultation",
    description: "Specialist teams & local RHU doctors conduct joint patient intake and triage.",
  },
  {
    phase: "Phase 2: Protocol Hand-off & Simulation",
    description: "Local healthcare workers lead interventions while visiting specialists supervise and calibrate standard operating procedures (SOPs).",
  },
  {
    phase: "Phase 3: Autonomous Barangay Healthcare Delivery",
    description: "BHWs and local municipal health teams operate field units and maintain patient registries independently.",
  },
];

const impacts = [
  {
    icon: FileText,
    title: "Institutional Continuity",
    description: "All diagnostic hardware, portable triage gear, and clinical documentation systems remain permanently on-site with the Sanchez Mira Municipal Health Office.",
  },
  {
    icon: Users,
    title: "Trained Human Capital",
    description: "Over 50 Barangay Health Workers and municipal medical staff certified in standardized emergency protocols, ensuring frontline response capability during future extreme weather events and medical crises.",
  },
  {
    icon: CheckCircle,
    title: "Network Integration",
    description: "Direct linkage between decentralized barangay health posts and regional hospital centers, minimizing referral delays through calibrated triage protocols.",
  },
];

export function Blueprint() {
  const { t } = useLanguage();

  return (
    <section id="blueprint" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block"
          >
            {t("Global Humanitarian Blueprint")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary"
          >
            {t("Adapting Russian Humanitarian Medical Models")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {t("Russian Medical Expertise in Sanchez Mira")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-muted-foreground leading-relaxed"
          >
            {t("Transitioning from temporary relief to self-sustaining medical infrastructure, drawing on international field methodologies in austere environments.")}
          </motion.p>
        </div>

        {/* Section 1: Operational Framework */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <Globe size={24} />
            </div>
            <h3 className="text-3xl font-bold font-serif text-primary">
              {t("The Operational Framework: Lessons from Global Field Medicine")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {frameworkItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white border border-border p-8 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <item.icon size={22} />
                </div>
                <h4 className="text-xl font-bold font-serif text-primary mb-3">{t(item.title)}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{t(item.description)}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-10">
            <p className="text-lg font-serif italic mb-6">
              {t("To build lasting resilience in Sanchez Mira, this cooperation applies three core operational principles:")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white/10 border border-white/20 p-6"
                >
                  <div className="text-3xl font-bold font-serif text-accent mb-3">{item.number}</div>
                  <h5 className="font-bold text-white mb-2">{t(item.title)}</h5>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">{t(item.description)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Core Pillars */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <h3 className="text-3xl font-bold font-serif text-primary">
              {t("Core Pillars of the Clinical Program")}
            </h3>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-white border border-border shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-muted/40 text-primary">
                <tr>
                  <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider">{t("Strategic Pillar")}</th>
                  <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider">{t("International Reference")}</th>
                  <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider">{t("Implementation in Sanchez Mira")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pillars.map((row, i) => (
                  <tr key={i} className="align-top">
                    <td className="px-6 py-5 font-semibold text-foreground">{t(row.pillar)}</td>
                    <td className="px-6 py-5 text-secondary font-medium italic">{t(row.reference)}</td>
                    <td className="px-6 py-5 text-muted-foreground text-sm leading-relaxed">{t(row.implementation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Knowledge Transfer Phases */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Activity size={24} />
            </div>
            <h3 className="text-3xl font-bold font-serif text-primary">
              {t("Structured Clinical Knowledge Transfer")}
            </h3>
          </div>

          <div className="max-w-2xl mx-auto">
            {phases.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < phases.length - 1 && (
                    <div className="w-0.5 flex-1 bg-secondary/30 my-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <h5 className="text-lg font-bold font-serif text-primary mb-1">{t(item.phase)}</h5>
                  <p className="text-muted-foreground leading-relaxed">{t(item.description)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 4: Long-Term Impact */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-3xl font-bold font-serif text-primary">
              {t("The Long-Term Impact")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impacts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white border border-border p-8 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                  <item.icon size={22} />
                </div>
                <h4 className="text-xl font-bold font-serif text-primary mb-3">{t(item.title)}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{t(item.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
