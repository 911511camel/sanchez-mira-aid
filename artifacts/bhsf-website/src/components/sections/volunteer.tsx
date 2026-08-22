import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, AlertCircle, Loader2, CheckCircle, Stethoscope, Users, HandHeart } from "lucide-react";

const specializations = [
  "General Practitioner",
  "Pediatrician",
  "Nurse",
  "Medical Technician",
  "Pharmacist",
  "Other Medical Professional",
];

const benefits = [
  {
    icon: Stethoscope,
    title: "Medical Professionals",
    description: "Doctors, pediatricians, nurses, and technicians ready to join our mobile outreach missions in remote barangays.",
  },
  {
    icon: Users,
    title: "Community Volunteers",
    description: "Local volunteers who help coordinate missions, distribute supplies, and connect health workers with families in need.",
  },
  {
    icon: HandHeart,
    title: "Organizations & Partners",
    description: "Hospitals, clinics, businesses, and NGOs that want to partner with BHSF to expand healthcare reach.",
  },
];

export function Volunteer() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !specialization) {
      setError("Please provide your name and medical specialization.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Placeholder submission — wire up to an API/backend endpoint when available.
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-involved" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block"
          >
            Get Involved
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6 text-primary"
          >
            Join Our Volunteer Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Whether you are a medical professional or a community partner, your time and skills
            directly power the mobile missions that bring healthcare to remote barangays.
          </motion.p>
        </div>

        {/* Ways to help */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl bg-muted/30 border border-border p-8 text-center shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-5">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold font-serif text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: intro */}
          <div className="pt-6">
            <h3 className="text-2xl font-bold font-serif text-primary mb-4">
              Medical Professionals
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Apply to join our <strong className="text-foreground">Medical Missions</strong> — mobile
              outreach clinics that bring diagnostic screenings, pediatric check-ups, and geriatric
              consultations directly to isolated barangays.
            </p>
            <ul className="space-y-4">
              {[
                "General practitioners, pediatricians, and nurses",
                "Mobile clinic health rollouts in remote sitios",
                "Flexible scheduling around your availability",
                "Direct, community-led impact in Sanchez Mira",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-secondary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-5 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-start gap-3">
              <Heart size={18} className="text-secondary shrink-0 mt-0.5 fill-secondary/20" />
              <p className="text-sm text-muted-foreground">
                Every volunteer hour brings a family one step closer to the care they deserve.
              </p>
            </div>
          </div>

          {/* Right: application form */}
          <div className="rounded-3xl bg-white border border-border shadow-xl p-8 md:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-primary mb-3">
                  Thank You for Volunteering!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your application has been received. Our team will reach out to you with details on
                  joining the next Medical Mission.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setSpecialization("");
                    setMessage("");
                  }}
                  className="rounded-full"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <h3 className="text-xl font-bold font-serif text-primary mb-2">
                  Volunteer Application
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="volunteer-name">Full Name</Label>
                  <Input
                    id="volunteer-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Dr. Juan Dela Cruz"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteer-email">Email Address</Label>
                  <Input
                    id="volunteer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteer-phone">Phone Number</Label>
                  <Input
                    id="volunteer-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09XX XXX XXXX"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Medical Specialization</Label>
                  <Select value={specialization} onValueChange={setSpecialization}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteer-message">Tell Us About Yourself</Label>
                  <Textarea
                    id="volunteer-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your experience, availability, and why you'd like to volunteer…"
                    rows={4}
                    className="rounded-xl"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-14 text-lg rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <Loader2 className="animate-spin" size={20} />
                      Submitting…
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  We'll contact you about upcoming Medical Missions. No experience required to help.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
