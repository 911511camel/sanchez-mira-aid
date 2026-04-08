import React from "react";
import { motion } from "framer-motion";
import { Home, Users, Truck } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "127",
    label: "Families Served",
    description: "Receiving consistent medical attention and essential supplies."
  },
  {
    icon: Truck,
    value: "42",
    label: "Mobile Clinic Visits",
    description: "Trips made to remote areas since our founding."
  },
  {
    icon: Home,
    value: "3",
    label: "Partner Barangays",
    description: "Communities currently under our comprehensive support program."
  }
];

export function Impact() {
  return (
    <section id="impact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-white">
            Our Impact So Far
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Every number represents a family relieved of worry, a child growing up healthier, and a community standing stronger together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6 text-accent">
                <stat.icon size={32} />
              </div>
              <div className="text-5xl font-bold font-serif text-white mb-2">{stat.value}</div>
              <div className="text-xl font-semibold text-white/90 mb-4">{stat.label}</div>
              <p className="text-primary-foreground/70">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
