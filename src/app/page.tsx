
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
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <Hero />
      
      <QuickInfoBar />

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        <Experience />
        
        <section id="hotels">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">{t('hotels_section_title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('hotels_section_desc')}</p>
          </div>
          <Hotels />
        </section>

        <section id="programme">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">{t('itin_title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('exp_desc')}</p>
          </div>
          <Itinerary />
        </section>

        <Pricing />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <DocumentsRequired />
          <TrustSection />
        </div>

        <section id="reservation" className="scroll-mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">{t('form_section_title')}</h2>
            <p className="text-muted-foreground">{t('form_section_desc')}</p>
          </div>
          <LeadForm />
        </section>

        <FinalCTA />
      </div>

      <footer className="border-t border-gold/10 py-12 px-6 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-md">
        <p className="mb-2">{t('footer_copy')}</p>
        <p className="font-headline italic text-gold">{t('footer_slogan')}</p>
      </footer>

      <a 
        href="https://wa.me/213550737434?text=Bonjour, je souhaite réserver l'offre Égypte 2026" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[300] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium">{t('whatsapp_cta')}</span>
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
