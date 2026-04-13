
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { QuickInfoBar } from "@/components/sections/QuickInfoBar";
import { Experience } from "@/components/sections/Experience";
import { Hotels } from "@/components/sections/Hotels";
import { Itinerary } from "@/components/sections/Itinerary";
import { Flights } from "@/components/sections/Flights";
import { Pricing } from "@/components/sections/Pricing";
import { DocumentsRequired } from "@/components/sections/DocumentsRequired";
import { TrustSection } from "@/components/sections/TrustSection";
import { LeadForm } from "@/components/sections/LeadForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MessageCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TRIP_CONFIG } from "@/lib/trip-config";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t } = useLanguage();
  
  // Selection States
  const [selectedHotelId, setSelectedHotelId] = useState<string>(TRIP_CONFIG.hotels[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(TRIP_CONFIG.departureDates[0].label);
  const [selectedRoomType, setSelectedRoomType] = useState<"single" | "double" | "triple">("double");
  
  // Detailed Traveler Composition
  const [adultCount, setAdultCount] = useState<number>(2);
  const [child1Count, setChild1Count] = useState<number>(0);
  const [child2Count, setChild2Count] = useState<number>(0);
  const [babyCount, setBabyCount] = useState<number>(0);

  const selectedHotel = useMemo(() => 
    TRIP_CONFIG.hotels.find(h => h.id === selectedHotelId) || TRIP_CONFIG.hotels[0]
  , [selectedHotelId]);

  // Logic & Validation (Provided Snippet Implementation)
  const priceData = useMemo(() => {
    const p = selectedHotel.pricingGridNum;
    let total = 0;
    let error = null;

    try {
      // 🔒 Validation (CRITICAL)
      if (selectedRoomType === "single" && adultCount !== 1) {
        throw new Error("Single room = 1 adulte فقط");
      }
      if (selectedRoomType === "double" && adultCount > 2) {
        throw new Error("Double room = max 2 adultes");
      }
      if (selectedRoomType === "triple" && adultCount > 3) {
        throw new Error("Triple room = max 3 adultes");
      }
      
      const children = (child1Count > 0 ? 1 : 0) + (child2Count > 0 ? 1 : 0);
      if (children > 2) {
        throw new Error("Maximum 2 enfants autorisés");
      }

      // 🧮 Calculation
      // Adults (Snippet: total += adults * p[roomType])
      total += adultCount * p[selectedRoomType];

      // Children
      if (child1Count > 0) total += p.child1;
      if (child2Count > 0) total += p.child2;

      // Infants (Snippet: total += infants * p.infant)
      total += babyCount * p.baby;

    } catch (e: any) {
      error = e.message;
    }

    return { total, error };
  }, [selectedHotel, selectedRoomType, adultCount, child1Count, child2Count, babyCount]);

  const formattedTotalPrice = useMemo(() => {
    return new Intl.NumberFormat('fr-DZ').format(priceData.total) + " DA";
  }, [priceData.total]);

  return (
    <main className="min-h-screen relative overflow-x-hidden pb-24">
      <Navbar />
      
      <Hero />
      
      <QuickInfoBar />

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        <Experience />
        
        <section id="hotels" className="scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">{t('hotels_section_title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('hotels_section_desc')}</p>
          </div>
          <Hotels 
            selectedId={selectedHotelId} 
            onSelect={setSelectedHotelId} 
          />
        </section>

        <section id="programme" className="scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">{t('itin_title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('exp_desc')}</p>
          </div>
          <Itinerary />
        </section>

        <section id="vols" className="scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline mb-4">{t('flights_title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('flights_desc')}</p>
          </div>
          <Flights 
            selectedDate={selectedDate} 
            onSelect={setSelectedDate} 
          />
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
          <div className="max-w-3xl mx-auto">
            <LeadForm 
              initialDate={selectedDate} 
              initialHotelId={selectedHotelId}
              initialRoomType={selectedRoomType}
              initialAdults={adultCount}
              initialChild1={child1Count}
              initialChild2={child2Count}
              initialBaby={babyCount}
              onAdultsChange={setAdultCount}
              onChild1Change={setChild1Count}
              onChild2Change={setChild2Count}
              onBabyChange={setBabyCount}
              onRoomTypeChange={setSelectedRoomType}
            />
          </div>
        </section>

        <FinalCTA />
      </div>

      <footer className="border-t border-gold/10 py-12 px-6 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-md">
        <p className="mb-2">{t('footer_copy')}</p>
        <p className="font-headline italic text-gold">{t('footer_slogan')}</p>
      </footer>

      {/* Sticky Price Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[250] bg-background/80 backdrop-blur-xl border-t border-gold/20 p-4 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            {priceData.error ? (
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-widest">{priceData.error}</p>
              </div>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Selection : {selectedHotel.name}</p>
                <p className="text-xs text-foreground/80 font-medium capitalize">
                  {selectedDate} · {selectedRoomType} · {adultCount} {t('form_v_adults')} 
                  {child1Count + child2Count > 0 && ` + ${(child1Count > 0 ? 1 : 0) + (child2Count > 0 ? 1 : 0)} Enfant(s)`}
                  {babyCount > 0 && ` + ${babyCount} Bébé(s)`}
                </p>
              </>
            )}
          </div>
          <div className="flex-1 flex items-center justify-end gap-6">
            {!priceData.error && (
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Total Séjour</p>
                <p className="text-2xl font-headline font-bold text-foreground">{formattedTotalPrice}</p>
              </div>
            )}
            <Button className="bg-gold hover:bg-gold/80 text-gold-foreground font-bold px-8 h-12 shadow-lg shadow-gold/20" asChild>
              <a href="#reservation">
                {t('nav_reserver')}
                <ArrowRight className="h-4 w-4 ms-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <a 
        href={`https://wa.me/213561616267?text=${encodeURIComponent(`Bonjour, je souhaite réserver l'offre Égypte 2026. Hôtel: ${selectedHotel.name}, Chambre: ${selectedRoomType}, Date: ${selectedDate}, Voyageurs: ${adultCount} Adultes, ${(child1Count > 0 ? 1 : 0) + (child2Count > 0 ? 1 : 0)} Enfants, ${babyCount} Bébé. Total: ${formattedTotalPrice}`)}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-8 z-[300] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium">{t('whatsapp_cta')}</span>
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
