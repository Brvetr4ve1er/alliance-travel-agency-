
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useCollection } from '@/firebase';
import { TravelOffer } from '@/lib/types';
import OfferCard from '@/components/offers/OfferCard';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedOffers() {
  const { data: offers, loading } = useCollection<TravelOffer>('offers');

  // Filter based on 'featured' property from new schema
  const featured = offers?.filter(o => o.featured).slice(0, 3) || offers?.slice(0, 3);

  return (
    <section className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4"
            >
              Elite Selections
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-4xl md:text-7xl font-bold text-white tracking-tighter"
            >
              Featured <span className="text-primary italic">Escapes.</span>
            </motion.h2>
          </div>
          
          <Link href="/offers">
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-white/40 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold"
            >
              Voir toutes les offres <ArrowRight className="w-4 h-4 text-accent" />
            </motion.button>
          </Link>
        </div>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4 text-white/20">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-[10px] uppercase tracking-widest font-mono">Loading Elite Packages...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured?.map((offer, idx) => (
              <OfferCard key={offer.id} offer={offer} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
