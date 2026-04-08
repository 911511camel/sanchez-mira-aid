import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-primary p-10 text-primary-foreground">
            <h2 className="text-3xl font-bold font-serif mb-6 text-white">Get in Touch</h2>
            <p className="text-primary-foreground/80 mb-10">
              Have questions about our programs, or want to volunteer? We'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Office</h4>
                  <p className="text-primary-foreground/80">Santo Tomas<br />Isabela, Philippines</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Phone</h4>
                  <p className="text-primary-foreground/80">+63 917 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Email</h4>
                  <p className="text-primary-foreground/80">info@bhsf.org.ph</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-primary-foreground/60 mb-1">Direct contact:</p>
              <p className="font-bold text-white">Maria Santos</p>
              <p className="text-sm text-primary-foreground/80">Fund Coordinator</p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 p-10 flex items-center justify-center bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[50px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="text-center relative z-10 max-w-sm">
              <h3 className="text-2xl font-bold font-serif text-primary mb-4">Partner With Us</h3>
              <p className="text-muted-foreground mb-8">
                Are you a medical professional, local business, or organization looking to partner with BHSF? Reach out to discuss collaboration opportunities.
              </p>
              <a 
                href="mailto:info@bhsf.org.ph" 
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors"
              >
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
