
"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function CarouselArrows({ onPrev, onNext }: CarouselArrowsProps) {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6">
      <button 
        onClick={onPrev}
        className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div className="h-px w-24 bg-white/20 relative">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-accent animate-pulse" />
      </div>
      <button 
        onClick={onNext}
        className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
