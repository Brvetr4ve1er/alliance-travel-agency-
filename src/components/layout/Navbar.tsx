
"use client";

import Link from "next/link";
import { MessageCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] backdrop-blur-2xl bg-background/50 border-b border-gold/10 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-headline text-2xl font-semibold tracking-tight">
        Alliance <span className="text-gold italic">Travel</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link href="#programme" className="text-sm font-medium hover:text-gold transition-colors">Programme</Link>
        <Link href="#hotels" className="text-sm font-medium hover:text-gold transition-colors">Hôtels</Link>
        <Link href="#vols" className="text-sm font-medium hover:text-gold transition-colors">Vols</Link>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          asChild 
          variant="outline" 
          className="hidden sm:flex border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"
        >
          <a 
            href="https://wa.me/213550737434?text=Bonjour, je souhaite réserver l'offre Égypte 2026" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Réserver
          </a>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}
