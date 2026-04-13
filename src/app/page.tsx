
"use client";

import React, { memo, Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { QuickInfoBar } from "@/components/sections/QuickInfoBar";
import { BookingProvider } from "@/components/providers/BookingProvider";

// Static Sections - SSR enabled for LCP
import { Experience } from "@/components/sections/Experience";
import { Itinerary } from "@/components/sections/Itinerary";
import { Pricing } from "@/components/sections/Pricing";
import { DocumentsRequired } from "@/components/sections/DocumentsRequired";
import { TrustSection } from "@/components/sections/TrustSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

// Interactive Sections - Deferred for TBT
const Hotels = dynamic(() => import("@/components/sections/Hotels").then(mod => mod.Hotels), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-2xl" />
});
const Flights = dynamic(() => import("@/components/sections/Flights").then(mod => mod.Flights), { ssr: false });
const LeadForm = dynamic(() => import("@/components/sections/LeadForm").then(mod => mod.LeadForm), { ssr: false });
const PriceSummaryBar = dynamic(() => import("@/components/sections/PriceSummaryBar").then(mod => mod.PriceSummaryBar), { ssr: false });
const WhatsAppFAB = dynamic(() => import("@/components/sections/WhatsAppFAB").then(mod => mod.WhatsAppFAB), { ssr: false });

const SectionHeader = memo(({ title, desc, id }: { title: string; desc?: string; id?: string }) => (
  <div id={id} className="text-center mb-16 scroll-mt-24">
    <h2 className="text-4xl md:text-5xl font-headline mb-4">{title}</h2>
    {desc && <p className="text-muted-foreground max-w-2xl mx-auto">{desc}</p>}
  </div>
));
SectionHeader.displayName = "SectionHeader";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden pb-24">
      <Navbar />
      <Hero />
      <QuickInfoBar />
      
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        <Experience />
        
        <BookingProvider>
          <section id="hotels">
            <SectionHeader title="Confort & Prestige" desc="Une sélection rigoureuse d'établissements d'excellence pour un séjour sans compromis." />
            <Suspense fallback={<div className="h-96 animate-pulse bg-white/5 rounded-2xl" />}>
              <Hotels />
            </Suspense>
          </section>

          <section id="programme">
            <SectionHeader title="Votre Itinéraire" desc="Plus qu'un simple voyage, nous vous offrons une immersion sensorielle." />
            <Itinerary />
          </section>

          <section id="vols">
            <SectionHeader title="Vols & Transports" desc="Voyagez en toute sérénité avec Turkish Airlines." />
            <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-2xl" />}>
              <Flights />
            </Suspense>
          </section>

          <Pricing />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <DocumentsRequired />
            <TrustSection />
          </div>

          <section id="reservation" className="max-w-4xl mx-auto">
            <SectionHeader title="Commencez Votre Voyage" desc="Remplissez le formulaire ci-dessous pour recevoir votre devis personnalisé." />
            <Suspense fallback={<div className="h-[600px] animate-pulse bg-white/5 rounded-2xl" />}>
              <LeadForm />
            </Suspense>
          </section>

          <PriceSummaryBar />
          <WhatsAppFAB />
        </BookingProvider>

        <FinalCTA />
      </div>

      <footer className="border-t border-gold/10 py-12 px-6 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-md">
        <p className="mb-2">© 2026 Alliance Travel — Licence d'État A. Tous droits réservés.</p>
        <p className="font-headline italic text-gold">L'expertise au service de vos émotions.</p>
      </footer>
    </main>
  );
}
