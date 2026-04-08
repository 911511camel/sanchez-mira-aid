import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Programs } from "@/components/sections/programs";
import { Impact } from "@/components/sections/impact";
import { Donation } from "@/components/sections/donation";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Mission />
        <Programs />
        <Impact />
        <Donation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
