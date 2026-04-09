
"use client";

import { ShieldCheck, Award, Users, Star } from "lucide-react";

export function TrustSection() {
  const points = [
    { icon: ShieldCheck, title: "Sérénité Totale", desc: "Plus de 10 ans d'expertise sur la destination Égypte." },
    { icon: Award, title: "Qualité Garantie", desc: "Hôtels sélectionnés et testés par nos équipes." },
    { icon: Users, title: "Prise en Charge", desc: "Accompagnateur dédié d'Alger au retour." },
  ];

  return (
    <div className="space-y-8">
      <div className="glass-panel p-8 rounded-2xl border-gold/10">
        <h3 className="text-3xl font-headline mb-8">Pourquoi nous choisir ?</h3>
        <div className="space-y-8">
          {points.map((p, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <p.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{p.title}</h4>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border-emerald-500/20 bg-emerald-500/5">
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-emerald-500 text-emerald-500" />)}
        </div>
        <p className="italic text-sm leading-relaxed mb-4">
          "Un voyage exceptionnel. L'organisation d'Alliance Travel était impeccable, du visa à l'arrivée jusqu'au retour à Alger. Les guides au Caire sont passionnants."
        </p>
        <p className="text-xs font-bold uppercase tracking-widest">— Famille Mansouri, Voyage 2024</p>
      </div>
    </div>
  );
}
