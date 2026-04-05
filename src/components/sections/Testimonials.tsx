
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const reviews = [
  {
    name: "Omar K.",
    role: "Business Traveler",
    text: "Alliance Travel transformed our family holiday to Istanbul. The VIP transfer and curated shopping tours were exceptional. Excellence in every detail."
  },
  {
    name: "Lina B.",
    role: "Luxe Explorer",
    text: "The Taghit desert retreat was magical. Truly high-end organization that is hard to find elsewhere. Highly recommend their bespoke services."
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <Quote className="w-12 h-12 text-primary/40 mb-8" />
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Voices of <span className="text-accent italic">Excellence.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-12 rounded-[3rem] border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              
              <p className="text-xl text-white/70 leading-relaxed italic mb-8">
                "{r.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-[10px] font-bold">{r.name[0]}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-tight">{r.name}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
