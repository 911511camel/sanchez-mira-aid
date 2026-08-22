import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import imgMedicine from "@/assets/images/program-medicine.png";
import imgMobile from "@/assets/images/program-mobile.png";
import imgMaternal from "@/assets/images/program-maternal.png";
import { Pill, Stethoscope, Baby } from "lucide-react";

const programs = [
  {
    title: "Medicines for Rural Families",
    description: "Providing essential medicines to families without access to pharmacies. We deliver basic first-aid kits, maintenance medications, and acute care supplies directly to homes.",
    image: imgMedicine,
    icon: Pill,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    title: "Mobile Doctor Visits",
    description: "Bringing licensed physicians directly to remote barangays on scheduled rounds. Our mobile clinics offer consultations, basic diagnostics, and follow-up care.",
    image: imgMobile,
    icon: Stethoscope,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Child and Maternal Health",
    description: "Prenatal care, immunizations, and nutrition support for mothers and children. Ensuring the next generation of Cagayan grows up strong and healthy.",
    image: imgMaternal,
    icon: Baby,
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
];

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary">
            Our Featured Programs
          </h2>
          <p className="text-lg text-muted-foreground">
            We focus on practical, immediate interventions that make a measurable difference in the daily lives of rural families.
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
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
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
