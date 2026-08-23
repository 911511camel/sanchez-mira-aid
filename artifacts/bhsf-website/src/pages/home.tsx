import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { SanchezMira } from "@/components/sections/sanchez-mira";
import { Programs } from "@/components/sections/programs";
import { Impact } from "@/components/sections/impact";
import { Leadership } from "@/components/sections/leadership";
import { Blueprint } from "@/components/sections/blueprint";
import { Volunteer } from "@/components/sections/volunteer";
import { Donation } from "@/components/sections/donation";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Mission />
        <SanchezMira />
        <Programs />
        <Impact />
        <Leadership />
        <Blueprint />
        <Volunteer />
        <Donation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
