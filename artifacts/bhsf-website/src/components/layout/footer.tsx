import React from "react";
import { Link } from "wouter";
import { HeartPulse, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary">
                <HeartPulse size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl leading-tight">Barangay Health Support Fund</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-lg max-w-md font-serif italic mb-6">
              "Better Health for Every Barangay"
            </p>
            <p className="text-primary-foreground/70 max-w-md">
              A humanitarian fund dedicated to improving healthcare access in rural barangays of Sanchez Mira, Cagayan, Philippines.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 font-serif">Quick Links</h4>
            <ul className="space-y-4 text-primary-foreground/80">
              <li><a href="#mission" className="hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="#impact" className="hover:text-white transition-colors">Impact</a></li>
              <li><a href="#donate" className="hover:text-white transition-colors">Donate</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 font-serif">Contact Us</h4>
            <ul className="space-y-4 text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>Sanchez Mira, Cagayan, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0" />
                <span>+63 917 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0" />
                <span>info@bhsf.org.ph</span>
              </li>
              <li className="pt-2">
                <span className="block text-sm opacity-60 mb-1">Vice Mayor & Fund Coordinator</span>
                <span className="font-medium text-white">Dr. Connie Marie Oroceo-Sacramed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Barangay Health Support Fund. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
