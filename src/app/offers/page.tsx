
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/layout/FloatingNav';
import TopLogo from '@/components/layout/TopLogo';
import OfferCard from '@/components/offers/OfferCard';
import { Input } from '@/components/ui/input';
import { Search, Loader2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useCollection } from '@/firebase';
import { TravelOffer } from '@/lib/types';
import WhatsAppFloatingCTA from '@/components/ui/WhatsAppFloatingCTA';
import Link from 'next/link';
import Image from 'next/image';
import { formatPriceDZD } from '@/lib/utils';

export default function OffersPage() {
  const [search, setSearch] = useState("");
  const { data: offers, loading } = useCollection<TravelOffer>('offers');

  const filteredOffers = offers?.filter(offer => 
    offer.title.toLowerCase().includes(search.toLowerCase()) || 
    offer.country.toLowerCase().includes(search.toLowerCase()) ||
    offer.city?.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-background text-foreground pb-24 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <TopLogo />
      <FloatingNav />
      <WhatsAppFloatingCTA />

      <div className="max-w-7xl mx-auto px-6 pt-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-accent text-[11px] font-bold tracking-[0.5em] uppercase mb-6"
            >
              Elite Collections
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-headline text-6xl md:text-9xl font-bold leading-none tracking-tighter"
            >
              Collection <span className="text-primary italic">Privée</span>
            </motion.h1>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative flex-1 md:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-accent transition-colors" />
              <Input 
                placeholder="Chercher une destination..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-16 h-20 bg-white/5 border-white/10 rounded-[2rem] focus:ring-accent focus:border-accent text-white placeholder:text-white/20 transition-all text-sm font-medium"
              />
            </div>
            <button className="h-20 w-20 flex items-center justify-center bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors text-white/40 hover:text-accent">
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Signature Highlights */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10 text-[10px] text-accent uppercase tracking-[0.5em] font-bold">
            <Sparkles className="w-5 h-5" /> Collections Signatures
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Link href="/offers/malaysia-2026" className="group relative aspect-[16/8] rounded-[4rem] overflow-hidden border border-accent/20 shadow-3xl">
              <Image 
                src="https://images.unsplash.com/photo-1596422846543-75c6fc18a594?auto=format&fit=crop&q=80&w=1200"
                alt="Malaysia"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 p-16 flex flex-col justify-end">
                <p className="text-accent text-[10px] font-bold uppercase tracking-[0.6em] mb-6">Malaisie 2026</p>
                <h3 className="text-5xl md:text-7xl font-serif text-white italic leading-none mb-6">L'Odyssée Kuala Lumpur</h3>
                <div className="flex flex-wrap items-center gap-8 text-white/60 text-[11px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2">7 Nuits</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="flex items-center gap-2 text-accent">{formatPriceDZD(211000)} / pers.</span>
                </div>
              </div>
            </Link>
            
            <div className="bg-white/5 border border-white/10 rounded-[4rem] p-16 flex flex-col justify-center text-center space-y-8">
              <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto transform rotate-12">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-4xl font-serif text-white italic">Plus d'évasions à venir</h3>
              <p className="text-white/40 text-lg font-serif italic max-w-sm mx-auto leading-relaxed">Nos experts parcourent le monde pour vous dénicher les prochaines pépites de notre collection privée.</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="flex items-center gap-4 mb-10 text-[10px] text-white/30 uppercase tracking-[0.5em] font-bold">
          <SlidersHorizontal className="w-5 h-5" /> Toutes nos offres
        </div>
        {loading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-6 text-white/20">
            <Loader2 className="w-12 h-12 animate-spin text-accent" />
            <p className="text-[11px] uppercase tracking-widest font-mono">Chargement des offres...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredOffers?.map((offer, idx) => (
                <OfferCard key={offer.id} offer={offer} index={idx} />
              ))}
            </AnimatePresence>
            
            {!loading && filteredOffers?.length === 0 && (
              <div className="col-span-full py-32 text-center glass rounded-[4rem] border-dashed border-white/10">
                <p className="text-white/40 font-mono text-sm tracking-widest uppercase mb-6">Aucun résultat trouvé pour "{search}"</p>
                <button 
                  onClick={() => setSearch("")}
                  className="text-accent text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-accent/30 pb-1"
                >
                  Réinitialiser la recherche
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-40 py-24 px-6 border-t border-white/5 text-center">
        <p className="text-[11px] text-white/20 uppercase tracking-[0.8em] font-light">Alliance Travel DZ • Excellence in Travel © 2024</p>
      </footer>
    </main>
  );
}
