
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Compass, Star, MapPin, Wind } from 'lucide-react';

const destinations = [
  {
    title: "Tropical Escapes",
    description: "Paradise found in Bali's hidden coves.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-2 md:row-span-2",
    icon: Wind
  },
  {
    title: "Urban Rhythms",
    description: "The concrete jungle of NYC.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-1 md:row-span-1",
    icon: MapPin
  },
  {
    title: "Alpine Peaks",
    description: "Fresh air in the Swiss Alps.",
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-1 md:row-span-2",
    icon: Compass
  },
  {
    title: "Ancient Mysteries",
    description: "Echoes of Egypt's great pyramids.",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-1 md:row-span-1",
    icon: Star
  },
  {
    title: "Nordic Lights",
    description: "Dancing colors in Iceland.",
    image: "https://images.unsplash.com/photo-1531366930477-4fbd0ce512e7?auto=format&fit=crop&q=80&w=800",
    size: "md:col-span-2 md:row-span-1",
    icon: Wind
  }
];

export default function BentoDestinations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest uppercase mb-4"
          >
            Curated Collections
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-4xl md:text-6xl font-bold text-white max-w-2xl leading-tight"
          >
            Your journey, <span className="text-primary italic">refined.</span>
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]"
        >
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover="hover"
              className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 cursor-pointer transform-gpu will-change-transform shadow-xl ${dest.size}`}
            >
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-50"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              <motion.div 
                variants={{ hover: { backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" } }}
                className="absolute inset-0 z-10 transition-colors duration-300"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
              
              <div className="absolute top-6 left-6 z-20">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <dest.icon className="w-5 h-5" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h3 className="text-white font-headline text-2xl font-bold mb-1">{dest.title}</h3>
                <p className="text-white/60 text-sm">{dest.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
