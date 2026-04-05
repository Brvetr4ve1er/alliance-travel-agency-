"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Star, Plane, ChevronRight, Zap } from 'lucide-react';
import { TravelOffer } from '@/lib/types';
import { formatPriceDZD, cn } from '@/lib/utils';

interface OfferCardProps {
  offer: TravelOffer;
  index: number;
}

export default function OfferCard({ offer, index }: OfferCardProps) {
  const isLimited = offer.seats_left !== undefined && offer.seats_left <= 5;
  const locationText = `${offer.city?.[0] || ''}${offer.city?.[0] ? ', ' : ''}${offer.country}`;
  
  // Custom link handling for hardcoded signature offers
  // slug is key for identifying Malaysia specialized page
  const detailLink = offer.slug === 'malaysia-2026' ? `/offers/malaysia-2026` : `/offers/${offer.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-accent/40 transition-all duration-500 shadow-2xl flex flex-col h-full transform-gpu hover:-translate-y-2"
    >
      {/* Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={offer.images?.[0] || 'https://picsum.photos/seed/travel/800/500'}
          alt={offer.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          data-ai-hint="Travel destination"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          {offer.hotels?.[0] && (
            <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 border-white/10">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{offer.hotels[0].stars}* Elite</span>
            </div>
          )}
          {isLimited && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
              <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">Plus que {offer.seats_left} places</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-2 text-white/70 text-[9px] uppercase tracking-widest font-mono font-bold">
            <MapPin className="w-3 h-3 text-accent" />
            {locationText}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex-1 space-y-5">
          <h3 className="text-2xl font-headline font-bold text-white leading-tight group-hover:text-accent transition-colors italic">
            {offer.title}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest">{offer.duration}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <Plane className="w-4 h-4 text-accent" />
              <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest truncate">
                {offer.flights?.[0]?.class || 'Premium'} Class
              </span>
            </div>
          </div>

          {/* Tags */}
          {offer.tags && offer.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {offer.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="text-[8px] bg-white/5 border border-white/10 px-2 py-1 rounded-full text-white/40 uppercase tracking-widest font-mono">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1 font-mono">Tarif Privilège</p>
            <p className="text-xl font-bold text-white tracking-tight">{formatPriceDZD(offer.base_price)}</p>
          </div>
          <Link href={detailLink}>
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all hover:gap-4 active:scale-95 shadow-lg shadow-accent/20">
              Voir l'offre <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}