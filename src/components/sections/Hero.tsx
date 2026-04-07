
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Calendar, ShieldCheck, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
      <div className="animate-fade-up opacity-0 delay-100 flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs tracking-[0.2em] uppercase font-medium mb-8">
        <span className="text-base">🇪🇬</span> Égypte 2026 · Caire & Sharm El Sheikh
      </div>
      
      <h1 className="animate-fade-up opacity-0 delay-200 text-5xl md:text-8xl font-headline font-light leading-[1.1] mb-6 max-w-4xl">
        Les <em className="italic text-primary">Pyramides</em> & <br />
        la Mer Rouge
      </h1>
      
      <p className="animate-fade-up opacity-0 delay-300 text-muted-foreground text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
        Sept nuits inoubliables — entre les merveilles du Caire antique et les eaux cristallines de Sharm El Sheikh. Vol Egyptair, hôtels All Inclusive, excursions incluses.
      </p>
      
      <div className="animate-fade-up opacity-0 delay-400 flex flex-wrap justify-center gap-3 mb-12">
        {[
          { icon: Calendar, label: "7 nuits / 8 jours" },
          { icon: ShieldCheck, label: "All Inclusive (Sharm)" },
          { icon: Plane, label: "Vols Egyptair" },
          { icon: MapPin, label: "Visa à l'arrivée (25$)" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-foreground/80">
            <item.icon className="h-4 w-4 text-primary" />
            {item.label}
          </div>
        ))}
      </div>

      <div className="animate-fade-up opacity-0 delay-500 text-2xl md:text-3xl font-headline text-primary">
        À partir de <span className="font-bold text-4xl md:text-5xl">180 000 DA</span>
      </div>
    </section>
  );
}
