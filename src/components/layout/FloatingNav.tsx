"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Explore', href: '/' },
  { label: 'Offres', href: '/offers' },
  { label: 'Journal', href: '/journal' },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-full px-4 py-2 flex items-center gap-1 shadow-2xl border-white/10"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link href="/#contact">
          <button className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105 active:scale-95">
            Réserver
          </button>
        </Link>
      </motion.div>
    </nav>
  );
}
