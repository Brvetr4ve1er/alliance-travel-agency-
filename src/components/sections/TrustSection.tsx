
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Zap, Globe, Award, Headphones } from 'lucide-react';

const pillars = [
  {
    icon: Award,
    title: "Expertise Privilège",
    desc: "Chaque itinéraire est conçu par des spécialistes du luxe qui maîtrisent les nuances du marché premium algérien."
  },
  {
    icon: Headphones,
    title: "Conciergerie 24/7",
    desc: "Un accompagnement dédié avant, pendant et après votre voyage. Nous gérons les détails, vous vivez l'exception."
  },
  {
    icon: ShieldCheck,
    title: "Intégrité & Sécurité",
    desc: "Partenaire officiel des plus grands réseaux mondiaux, garantissant transparence et sécurité de vos transactions en DZD."
  }
];

export default function TrustSection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
           <p className="text-accent text-[10px] font-bold tracking-[0.6em] uppercase">Signature Alliance</p>
           <h2 className="font-headline text-4xl md:text-6xl font-bold text-white tracking-tighter">L'Excellence <span className="text-primary italic">Distillée.</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20">
          {pillars.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="space-y-8 text-center lg:text-left group"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto lg:mx-0 group-hover:bg-accent/10 group-hover:border-accent/40 transition-all duration-500 transform group-hover:-rotate-6">
                <p.icon className="w-10 h-10 text-accent" />
              </div>
              <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold text-white tracking-tight">{p.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm font-body">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
