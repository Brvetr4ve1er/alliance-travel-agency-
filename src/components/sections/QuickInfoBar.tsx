
"use client";

import { Clock, Star, Plane, ShieldCheck, Coffee } from "lucide-react";

export function QuickInfoBar() {
  const info = [
    { icon: Clock, label: "Durée", value: "8 Jours / 7 Nuits" },
    { icon: Star, label: "Hôtels", value: "4★ à 5★ Luxe" },
    { icon: Plane, label: "Vols", value: "Egyptair Inclus" },
    { icon: ShieldCheck, label: "Visa", value: "Support Inclus" },
    { icon: Coffee, label: "Pension", value: "All Inclusive Soft" },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-6">
      <div className="glass-panel rounded-2xl border-gold/20 flex flex-wrap items-center justify-between p-6 md:p-8 gap-8 md:gap-4">
        {info.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 flex-1 min-w-[140px] justify-center md:justify-start">
            <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <item.icon className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
