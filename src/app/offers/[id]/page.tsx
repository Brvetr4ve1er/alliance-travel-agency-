"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useDoc } from '@/firebase';
import { TravelOffer } from '@/lib/types';
import FloatingNav from '@/components/layout/FloatingNav';
import TopLogo from '@/components/layout/TopLogo';
import { MapPin, Clock, Plane, Hotel, Check, Loader2, MessageCircle, Calendar, ShieldCheck, Star, Users, ArrowRight } from 'lucide-react';
import WhatsAppFloatingCTA from '@/components/ui/WhatsAppFloatingCTA';
import LeadCaptureForm from '@/components/leads/LeadCaptureForm';
import { formatPriceDZD } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function OfferDetailPage() {
  const { id } = useParams();
  const { data: offer, loading } = useDoc<TravelOffer>(`offers/${id}`);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-white font-sans text-xs uppercase tracking-widest">
        Offre introuvable
      </div>
    );
  }

  const whatsappMessage = `Bonjour Alliance Travel, je souhaite réserver l'offre "${offer.title}".`;
  const whatsappUrl = `https://wa.me/213555555555?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <TopLogo />
      <FloatingNav />
      <WhatsAppFloatingCTA />

      {/* Editorial Hero */}
      <header className="relative h-[85vh] w-full bg-primary overflow-hidden">
        <Image
          src={offer.images?.[0] || 'https://picsum.photos/seed/travel/1920/1080'}
          alt={offer.title}
          fill
          className="object-cover opacity-60 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl space-y-8"
          >
            <div className="flex items-center justify-center gap-4 text-accent font-sans text-[10px] uppercase tracking-[0.6em]">
              <MapPin className="w-3 h-3" />
              {offer.city?.join(' • ')} — {offer.country}
            </div>
            <h1 className="text-6xl md:text-9xl font-serif text-white leading-[1.1] italic">
              {offer.title}
            </h1>
            <div className="flex items-center justify-center gap-12 text-white/60 text-xs uppercase tracking-[0.3em] font-medium">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> {offer.duration}</span>
              <span className="flex items-center gap-2"><Plane className="w-4 h-4 text-accent" /> {offer.flights?.[0]?.class || 'Premium'}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Narrative Sections */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-32">
            
            {/* Rates & Accommodation */}
            <section className="space-y-12">
              <header className="space-y-4">
                <h2 className="text-4xl font-serif text-white">Hébergement & Tarifs</h2>
                <div className="h-px w-24 bg-accent/40" />
              </header>

              <div className="space-y-8">
                {offer.hotels.map((hotel, idx) => (
                  <article key={idx} className="glass-panel p-10 group hover:border-accent/20 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-2xl font-serif text-white">{hotel.name}</h3>
                          <div className="flex gap-1">
                            {[...Array(hotel.stars)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-accent uppercase tracking-widest font-bold">{hotel.type}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-l border-white/5 pl-8">
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Chambre Double</p>
                          <p className="text-xl font-serif text-white">{formatPriceDZD(hotel.price_double)}</p>
                        </div>
                        {hotel.price_child && (
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Enfant</p>
                            <p className="text-xl font-serif text-white/70">{formatPriceDZD(hotel.price_child)}</p>
                          </div>
                        )}
                        {hotel.price_baby && (
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Bébé</p>
                            <p className="text-xl font-serif text-white/50">{formatPriceDZD(hotel.price_baby)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="space-y-12">
              <header className="space-y-4">
                <h2 className="text-4xl font-serif text-white">L'Itinéraire Elite</h2>
                <div className="h-px w-24 bg-accent/40" />
              </header>

              <Accordion type="single" collapsible className="w-full space-y-6">
                {offer.program?.map((item) => (
                  <AccordionItem key={item.day} value={`day-${item.day}`} className="border-white/5">
                    <AccordionTrigger className="hover:no-underline py-8">
                      <div className="flex items-center gap-8 text-left">
                        <span className="text-xs font-bold text-accent font-serif italic">Jour {item.day}</span>
                        <span className="text-xl font-serif text-white/90">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-white/50 leading-relaxed text-sm max-w-2xl pl-20 pb-8">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Inclusions */}
            <section className="space-y-12">
              <header className="space-y-4">
                <h2 className="text-4xl font-serif text-white">Ce qui est inclus</h2>
                <div className="h-px w-24 bg-accent/40" />
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {offer.highlights?.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {highlight}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Conversion */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="glass-panel p-12 space-y-10 border-accent/20">
                <div className="space-y-4">
                  <p className="text-[10px] text-accent uppercase tracking-[0.4em] font-bold">Tarif Privilège</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-serif text-white italic">À partir de</span>
                    <span className="text-4xl font-sans font-bold text-white">{formatPriceDZD(offer.base_price)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full bg-accent text-accent-foreground h-16 text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Réserver par WhatsApp
                  </a>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="flex items-center justify-center gap-3 w-full bg-white text-black h-16 text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all">
                        <Calendar className="w-4 h-4" />
                        Demander un devis VIP
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-background border-white/5 p-12 rounded-none max-w-xl">
                      <DialogHeader className="mb-10 text-center">
                        <DialogTitle className="text-4xl font-serif italic mb-2">Projet sur Mesure</DialogTitle>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">{offer.title}</p>
                      </DialogHeader>
                      <LeadCaptureForm 
                        defaultDestination={offer.country} 
                        onSuccess={() => setIsDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                    <ShieldCheck className="w-4 h-4 text-accent" /> Paiement Sécurisé DZD
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                    <Users className="w-4 h-4 text-accent" /> Conciergerie 24/7
                  </div>
                </div>
              </div>

              {/* Credibility */}
              <div className="p-8 text-center space-y-4">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] leading-relaxed">
                  Agence de voyage agréée • DZ Expertise <br /> Excellence en voyage depuis 2024
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="py-24 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.8em]">Alliance Travel DZ — Signature d'Exception</p>
      </footer>
    </main>
  );
}
