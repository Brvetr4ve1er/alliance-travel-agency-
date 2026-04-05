
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Hotel, Plane, Clock, Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface PackageData {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  duration: string;
  images: string[];
  tags: string[];
  transport: string;
  hotel: string;
}

export default function PackageCard({ packageData, index }: { packageData: PackageData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden transform-gpu will-change-transform hover:border-accent/40 transition-colors shadow-2xl"
    >
      {/* Image Container with Carousel */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {packageData.images.map((img, i) => (
              <CarouselItem key={i}>
                <div className="relative w-full h-full aspect-[4/3]">
                  <Image 
                    src={img} 
                    alt={`${packageData.title} view ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    data-ai-hint="Travel landscape"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 right-12 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <CarouselPrevious className="relative h-8 w-8 bg-black/40 border-white/10 backdrop-blur-md text-white hover:bg-accent hover:text-black" />
            <CarouselNext className="relative h-8 w-8 bg-black/40 border-white/10 backdrop-blur-md text-white hover:bg-accent hover:text-black" />
          </div>
        </Carousel>

        {/* Overlay Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          <div className="bg-black/40 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-2">
            <Star className="w-3 h-3 text-accent fill-accent" />
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{packageData.rating}</span>
          </div>
        </div>

        <div className="absolute top-6 right-6 z-10">
          <div className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
            ${packageData.price}
          </div>
        </div>
        
        {/* Gradient Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-accent" />
                {packageData.location}
              </div>
              <h3 className="text-2xl font-headline font-bold text-white tracking-tight leading-none group-hover:text-accent transition-colors">
                {packageData.title}
              </h3>
            </div>
          </div>

          {/* Icon Stats Row */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center gap-1">
              <Hotel className="w-4 h-4 text-white/40" />
              <span className="text-[9px] text-white/60 font-medium truncate w-full text-center">Ritz 5*</span>
            </div>
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center gap-1">
              <Plane className="w-4 h-4 text-white/40" />
              <span className="text-[9px] text-white/60 font-medium truncate w-full text-center">Business</span>
            </div>
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center gap-1">
              <Clock className="w-4 h-4 text-white/40" />
              <span className="text-[9px] text-white/60 font-medium truncate w-full text-center">{packageData.duration}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-white/10">
                <img src={`https://picsum.photos/seed/${i + packageData.id}/32/32`} alt="Traveler" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
              +82
            </div>
          </div>
          <button className="bg-white/10 hover:bg-accent hover:text-accent-foreground text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all transform-gpu active:scale-95">
            Details
          </button>
        </div>
      </div>

      {/* Interactive Hover Blur State */}
      <div className={cn(
        "absolute inset-0 bg-accent/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500",
        !isHovered && "backdrop-blur-none"
      )} />
    </motion.div>
  );
}
