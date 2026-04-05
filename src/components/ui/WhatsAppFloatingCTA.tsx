
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingCTA() {
  const whatsappNumber = "213555555555"; // Example Algerian number
  const message = "Bonjour Alliance Travel, je souhaite obtenir des informations sur vos séjours premium.";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, x: 20 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white pl-4 pr-6 py-4 rounded-full shadow-2xl flex items-center gap-4 group"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute top-[-4px] right-[-4px] w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1 opacity-70">Concierge en ligne</span>
        <span className="font-bold text-sm whitespace-nowrap">Discuter sur WhatsApp</span>
      </div>
      
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
    </motion.a>
  );
}
