
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/layout/FloatingNav';
import TopLogo from '@/components/layout/TopLogo';
import PackageCard from '@/components/packages/PackageCard';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight, Home, SlidersHorizontal } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import WhatsAppFloatingCTA from '@/components/ui/WhatsAppFloatingCTA';

const premiumPackages = [
  {
    id: 1,
    title: "Istanbul Imperial Elite",
    location: "Istanbul, Turkey",
    price: 185000,
    rating: 4.9,
    duration: "8 Days",
    images: [
      PlaceHolderImages.find(img => img.id === 'landmark-blue-mosque')?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === 'istanbul-bg')?.imageUrl || "",
    ],
    tags: ["Shopping", "Culture", "VIP"],
    transport: "Air Algérie Business",
    hotel: "CVK Park Bosphorus 5*"
  },
  {
    id: 2,
    title: "Hammamet Azure Retreat",
    location: "Hammamet, Tunisia",
    price: 95000,
    rating: 4.8,
    duration: "7 Days",
    images: [
      PlaceHolderImages.find(img => img.id === 'landmark-sidi-bou-said')?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === 'tunisia-bg')?.imageUrl || "",
    ],
    tags: ["Beach", "Family", "Relax"],
    transport: "Luxury Coach",
    hotel: "Hasdrubal Thalassa & Spa"
  },
  {
    id: 3,
    title: "Sahara Golden Trails",
    location: "Taghit, Algeria",
    price: 120000,
    rating: 5.0,
    duration: "5 Days",
    images: [
      PlaceHolderImages.find(img => img.id === 'landmark-taghit')?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === 'sahara-bg')?.imageUrl || "",
    ],
    tags: ["Adventure", "Luxury", "Desert"],
    transport: "Domestic Flight",
    hotel: "Desert Boutique Lodge"
  },
  {
    id: 4,
    title: "Dubai Skyline Elite",
    location: "Dubai, UAE",
    price: 245000,
    rating: 4.9,
    duration: "6 Days",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518684079-3c830d6ce5a3?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Luxury", "Shopping", "High-End"],
    transport: "Emirates Included",
    hotel: "Atlantis The Royal"
  }
];

export default function PackagesPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPackages = premiumPackages.filter(pkg => 
    pkg.title.toLowerCase().includes(search.toLowerCase()) || 
    pkg.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background text-foreground pb-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <TopLogo />
      <FloatingNav />
      <WhatsAppFloatingCTA />

      <div className="max-w-7xl mx-auto px-6 pt-32">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 font-mono">
          <Home className="w-3 h-3" />
          <ChevronRight className="w-3 h-3" />
          <span>Offers</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-accent font-bold">Premium Collections</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-accent text-xs font-bold tracking-[0.4em] uppercase mb-4"
            >
              Tailored Algerian Excellence
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-headline text-5xl md:text-8xl font-bold leading-none tracking-tighter"
            >
              Curated <span className="text-primary italic">Escapes</span>
            </motion.h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-accent transition-colors" />
              <Input 
                placeholder="Find your destination..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-14 h-16 bg-white/5 border-white/10 rounded-3xl focus:ring-accent focus:border-accent text-white placeholder:text-white/20 transition-all"
              />
            </div>
            <button className="h-16 w-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg, idx) => (
              <PackageCard key={pkg.id} packageData={pkg} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 pt-12 border-t border-white/5">
          {[1].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={cn(
                "w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-sm font-bold transition-all border",
                currentPage === num 
                  ? "bg-accent border-accent text-accent-foreground shadow-xl shadow-accent/20 scale-110" 
                  : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white"
              )}
            >
              {num.toString().padStart(2, '0')}
            </button>
          ))}
          <p className="ml-4 text-[10px] text-white/20 uppercase tracking-widest font-mono">End of listing</p>
        </div>
      </div>

      <footer className="mt-32 py-16 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.6em]">Alliance Travel DZ • Excellence in Travel © 2024</p>
      </footer>
    </main>
  );
}
