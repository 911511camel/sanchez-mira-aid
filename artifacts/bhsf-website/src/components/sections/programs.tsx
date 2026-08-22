import React from "react";
import { motion } from "framer-motion";
import imgMedicine from "@/assets/images/program-medicine.png";
import imgMobile from "@/assets/images/program-mobile.png";
import imgMaternal from "@/assets/images/program-maternal.png";
import imgRelief from "@/assets/images/health-post.png";
import { Pill, Stethoscope, Baby, LifeBuoy } from "lucide-react";

const programs = [
  {
    title: "Mobile Medical Missions (Outreach Clinics)",
    scope: "Deploying volunteer doctors, nurses, and medical personnel to conduct diagnostic screenings, pediatric check-ups, and geriatric consultations directly in remote barangays.",
    milestone: "Conduct 6 mobile outreach missions per year, providing direct medical consultations to 1,200+ rural residents in isolated sitios.",
    image: imgMobile,
    icon: Stethoscope,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Essential Medicine Dispensary & Chronic Care",
    scope: "Supplying free prescription drugs, antibiotics, hypertension/diabetes maintenance medications, vitamins, and fever reducers to families unable to afford commercial pharmacy prices.",
    milestone: "Establish a revolving medicine stockpile to support 800 chronic-care patients and distribute 500 emergency home medicine kits annually.",
    image: imgMedicine,
    icon: Pill,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    title: "Maternal, Infant & Pediatric Care",
    scope: "Providing prenatal care supplements (folic acid, iron), infant nutrition monitoring, pediatric deworming, and basic hygiene packages for mothers and newborns.",
    milestone: "Support 250 expectant mothers with prenatal supplies and screen 600 young children for malnutrition and vitamin deficiencies.",
    image: imgMaternal,
    icon: Baby,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Emergency Relief & First-Aid Preparedness",
    scope: "Pre-positioning trauma and first-aid kits, water purification supplies, and emergency response kits with Barangay Health Workers (BHWs) ahead of typhoon landfall.",
    milestone: "Train and equip 50 Barangay Health Workers across 10 vulnerable barangays with standardized emergency trauma and disaster-response kits.",
    image: imgRelief,
    icon: LifeBuoy,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  }
];

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary">
            Our Focus Areas: Direct Medical & Community Relief
          </h2>
          <p className="text-lg text-muted-foreground">
            Targeted interventions designed for sustainable local impact.
          </p>
        </div>

        <div className="space-y-16">
          {programs.map((program, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-6 px-4 md:px-8">
                <div className={`w-14 h-14 rounded-2xl ${program.bgColor} ${program.color} flex items-center justify-center`}>
                  <program.icon size={28} />
                </div>
                <h3 className="text-3xl font-bold font-serif text-primary">{program.title}</h3>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Scope</h4>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {program.scope}
                  </p>
                </div>

                <div className="rounded-2xl bg-primary/5 border border-primary/15 p-5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Milestone Target</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {program.milestone}
                  </p>
                </div>

                <div className="pt-4">
                  <a 
                    href="#donate" 
                    className="inline-flex items-center font-bold text-primary hover:text-secondary transition-colors group"
                  >
                    Support this program
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
