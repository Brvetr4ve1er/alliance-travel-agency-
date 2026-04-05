"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { springConfig } from '@/lib/motion-physics';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CarouselArrows from './CarouselArrows';
import DynamicText from './DynamicText';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    location: "Kuala Lumpur, Malaysia",
    landmark: "Petronas Twin Towers",
    timezone: "Asia/Kuala_Lumpur",
    coords: "3.1408° N, 101.6932° E",
    bg: PlaceHolderImages.find(img => img.id === 'malaysia-bg')?.imageUrl || null,
    landmarkImg: PlaceHolderImages.find(img => img.id === 'landmark-petronas')?.imageUrl || null,
    hint: "Malaysia",
    slug: "malaysia-2026"
  },
  {
    id: 2,
    location: "Istanbul, Turkey",
    landmark: "The Blue Mosque",
    timezone: "Europe/Istanbul",
    coords: "41.0054° N, 28.9768° E",
    bg: PlaceHolderImages.find(img => img.id === 'istanbul-bg')?.imageUrl || null,
    landmarkImg: PlaceHolderImages.find(img => img.id === 'landmark-blue-mosque')?.imageUrl || null,
    hint: "Istanbul",
    slug: "istanbul-elite"
  },
  {
    id: 3,
    location: "Hammamet, Tunisia",
    landmark: "Sidi Bou Said",
    timezone: "Africa/Tunis",
    coords: "36.8065° N, 10.1815° E",
    bg: PlaceHolderImages.find(img => img.id === 'tunisia-bg')?.imageUrl || null,
    landmarkImg: PlaceHolderImages.find(img => img.id === 'landmark-sidi-bou-said')?.imageUrl || null,
    hint: "Tunisia",
    slug: "tunisia-azure"
  },
  {
    id: 4,
    location: "Taghit, Algeria",
    landmark: "The Grand Erg",
    timezone: "Africa/Algiers",
    coords: "30.9238° N, 2.1866° W",
    bg: PlaceHolderImages.find(img => img.id === 'sahara-bg')?.imageUrl || null,
    landmarkImg: PlaceHolderImages.find(img => img.id === 'landmark-taghit')?.imageUrl || null,
    hint: "Sahara",
    slug: "sahara-golden"
  }
];

export default function ParallaxTicketCarousel() {
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const layer1X = useTransform(smoothX, [-500, 500], [-10, 10]);
  const layer1Y = useTransform(smoothY, [-500, 500], [-10, 10]);
  
  const layer2X = useTransform(smoothX, [-500, 500], [-30, 30]);
  const layer2Y = useTransform(smoothY, [-500, 500], [-30, 30]);

  const layer3X = useTransform(smoothX, [-500, 500], [-60, 60]);
  const layer3Y = useTransform(smoothY, [-500, 500], [-80, 80]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const formatted = new Intl.DateTimeFormat('fr-DZ', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: slides[index].timezone
        }).format(now);
        setCurrentTime(formatted);
      } catch (e) {
        console.error('Time update error:', e);
        setCurrentTime(now.toLocaleTimeString());
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [index]);

  const nextSlide = useCallback(() => setIndex((prev) => (prev + 1) % slides.length), []);
  const prevSlide = useCallback(() => setIndex((prev) => (prev - 1 + slides.length) % slides.length), []);

  const currentSlide = slides[index];
  const detailLink = currentSlide.slug === 'malaysia-2026' ? '/offers/malaysia-2026' : '/offers';

  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {/* Layer 1: Background */}
          {currentSlide.bg && (
            <motion.div 
              style={{ x: layer1X, y: layer1Y, scale: 1.05 }}
              className="absolute inset-0 z-0 will-change-transform transform-gpu"
            >
              <div className="absolute inset-0 bg-black/60 z-10" />
              <Image
                src={currentSlide.bg}
                alt="Background"
                fill
                className="object-cover blur-[1px]"
                priority
                data-ai-hint={`${currentSlide.hint} background`}
              />
            </motion.div>
          )}

          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl px-6 pt-12">
            <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center">
              
              <motion.div 
                style={{ x: layer1X, y: layer1Y }}
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none will-change-transform transform-gpu"
              >
                 <DynamicText 
                  text="VOTRE PASSEPORT POUR L'EXCELLENCE"
                  mouseX={smoothX}
                  mouseY={smoothY}
                  className="font-headline text-4xl md:text-8xl font-bold text-white tracking-tighter leading-none text-center px-4 max-w-4xl"
                />
              </motion.div>

              <motion.div 
                style={{ x: layer2X, y: layer2Y }}
                className="relative w-[320px] h-[460px] md:w-[340px] md:h-[480px] z-20 will-change-transform transform-gpu"
              >
                <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
                   <div className="p-10 h-full flex flex-col justify-between">
                      <div>
                        <p className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Boarding Pass</p>
                        <h3 className="text-white text-4xl font-headline font-bold leading-tight italic">{currentSlide.location}</h3>
                      </div>
                      
                      <div className="space-y-6">
                        <Link href={detailLink}>
                          <button className="w-full bg-accent text-accent-foreground h-14 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all pointer-events-auto shadow-xl shadow-accent/20">
                            Découvrir les offres <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>

                        <div className="flex justify-between items-end border-t border-white/10 pt-6">
                          <div className="space-y-1">
                            <p className="text-white/40 text-[9px] uppercase tracking-widest">Terminal</p>
                            <p className="text-white font-mono text-xs">PRIORITY-DZ</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/40 text-[9px] uppercase tracking-widest">Class</p>
                            <p className="text-white font-mono text-xs">FIRST</p>
                          </div>
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                             <div className="w-8 h-8 bg-black/5 rounded flex flex-col gap-1 p-1">
                                {[...Array(4)].map((_, i) => <div key={i} className="h-1 bg-black/30 w-full rounded-full" />)}
                             </div>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>

              {currentSlide.landmarkImg && (
                <motion.div 
                  style={{ x: layer3X, y: layer3Y }}
                  className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none will-change-transform transform-gpu"
                >
                  <div className="relative w-[450px] h-[550px] -top-12">
                    <Image
                      src={currentSlide.landmarkImg}
                      alt={currentSlide.landmark}
                      fill
                      className="object-contain"
                      priority
                      data-ai-hint={currentSlide.landmark}
                    />
                    <div className="absolute inset-x-0 bottom-20 h-1/4 bg-black/40 blur-3xl -z-10 rounded-full" />
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div
              style={{ x: layer2X, y: layer2Y }}
              className="mt-12 flex flex-col items-center gap-4 z-40 pointer-events-none transform-gpu will-change-transform"
            >
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-white font-mono text-sm tracking-widest uppercase">{currentTime}</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <span className="text-white/40 font-mono text-[9px] tracking-[0.3em] uppercase">{currentSlide.coords}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <CarouselArrows onPrev={prevSlide} onNext={nextSlide} />
    </section>
  );
}