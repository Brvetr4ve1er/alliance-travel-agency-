
"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Globe } from '@/components/ui/globe';
import LeadCaptureForm from '@/components/leads/LeadCaptureForm';

const GLOBE_MARKERS = [
  { id: 'algiers', location: [36.7538, 3.0588], label: 'ALGER HQ' },
  { id: 'istanbul', location: [41.0082, 28.9784], label: 'ISTANBUL' },
  { id: 'dubai', location: [25.2048, 55.2708], label: 'DUBAI' },
  { id: 'tunis', location: [36.8065, 10.1815], label: 'TUNIS' },
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function ContactSection() {
  const markers = useMemo(() => [...GLOBE_MARKERS], []);

  return (
    <section 
      id="contact" 
      className="py-32 px-6 md:px-12 bg-background relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          
          {/* Globe Column */}
          <motion.div 
            variants={itemVariants}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            <div className="w-full max-w-[500px] aspect-square relative z-10">
              <Globe 
                speed={0.0012}
                markers={markers}
              />
              
              {/* Static Label Overlay */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-1/4 left-1/4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">Alger HQ</span>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Form Column */}
          <motion.div 
            variants={itemVariants}
            className="glass p-10 md:p-16 rounded-[3.5rem] shadow-3xl relative order-1 lg:order-2"
          >
            <div className="absolute top-10 right-10 flex items-center gap-3">
               <span className="text-[10px] text-accent/50 font-mono uppercase tracking-[0.3em]">Service Concierge</span>
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>

            <header className="mb-12 space-y-6">
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-white leading-none tracking-tighter">
                Votre itinéraire <br />
                <span className="text-primary italic">sur mesure.</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md leading-relaxed font-body">
                Planification experte pour le voyageur algérien exigeant. 
                Excellence et discrétion garanties.
              </p>
            </header>

            <LeadCaptureForm source="web_form" />

            <footer className="mt-12 text-center">
              <p className="text-[9px] text-white/20 uppercase tracking-[0.5em] leading-loose">
                Confidentialité absolue • DZ Expertise
              </p>
            </footer>
          </motion.div>

        </motion.div>
      </div>
      
      <div className="absolute -bottom-48 -left-48 w-full max-w-lg aspect-square bg-accent/5 blur-[180px] rounded-full pointer-events-none" />
    </section>
  );
}
