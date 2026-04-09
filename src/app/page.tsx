
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { QuickInfoBar } from "@/components/sections/QuickInfoBar";
import { Experience } from "@/components/sections/Experience";
import { Hotels } from "@/components/sections/Hotels";
import { Itinerary } from "@/components/sections/Itinerary";
import { Pricing } from "@/components/sections/Pricing";
import { DocumentsRequired } from "@/components/sections/DocumentsRequired";
import { TrustSection } from "@/components/sections/TrustSection";
import { LeadForm } from "@/components/sections/LeadForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AIAssistant } from "@/components/AIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <Hero />
      
      <QuickInfoBar />

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        <Experience />
        
        <section id="hotels">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">Confort & Prestige</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Une sélection rigoureuse d'établissements d'excellence pour un séjour sans compromis.</p>
          </div>
          <Hotels />
        </section>

        <section id="programme">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">Votre Itinéraire</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Un équilibre parfait entre découvertes historiques et détente absolue.</p>
          </div>
          <Itinerary />
        </section>

        <Pricing />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <DocumentsRequired />
          <TrustSection />
        </div>

        <section id="reservation" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">Commencez Votre Voyage</h2>
            <p className="text-muted-foreground">Remplissez le formulaire ci-dessous pour recevoir votre devis personnalisé.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <LeadForm />
            </div>
            <div className="space-y-8">
              <div className="glass-panel p-6 rounded-xl border-gold/20">
                <h3 className="font-headline text-2xl text-gold mb-4">Besoin d'aide ?</h3>
                <p className="text-sm text-muted-foreground mb-6">Notre IA est disponible 24/7 pour répondre à toutes vos questions techniques sur le séjour.</p>
                <AIAssistant />
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </div>

      <footer className="border-t border-gold/10 py-12 px-6 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-md">
        <p className="mb-2">© 2026 Alliance Travel — Licence d'État A. Tous droits réservés.</p>
        <p className="font-headline italic text-gold">L'expertise au service de vos émotions.</p>
      </footer>

      <a 
        href="https://wa.me/213550737434?text=Bonjour, je souhaite réserver l'offre Égypte 2026" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[300] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium">Réserver via WhatsApp</span>
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
