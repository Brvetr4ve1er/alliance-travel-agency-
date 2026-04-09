
"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative rounded-3xl overflow-hidden py-20 px-8 text-center bg-gold/10 border border-gold/20">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]" />
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <Sparkles className="h-12 w-12 text-gold mx-auto animate-pulse" />
        <h2 className="text-4xl md:text-6xl font-headline leading-tight">
          Prêt pour l'évasion ?
        </h2>
        <p className="text-xl text-muted-foreground font-light">
          Les places pour les départs d'avril sont déjà réservées à 70%. Sécurisez votre voyage dès aujourd'hui.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-gold text-gold-foreground h-14 px-10 text-lg font-bold w-full sm:w-auto" asChild>
            <a href="#reservation">
              Réserver Maintenant <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-gold/30 text-gold h-14 px-10 text-lg w-full sm:w-auto" asChild>
            <a href="tel:+213550737434">Appeler un conseiller</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
