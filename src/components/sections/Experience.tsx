
"use client";

import { Camera, Waves, Landmark, Sparkles } from "lucide-react";
import Image from "next/image";

export function Experience() {
  const highlights = [
    {
      icon: Landmark,
      title: "Éternité de Gizeh",
      desc: "Contemplez les Pyramides et le Sphinx, ultimes témoins des merveilles antiques.",
    },
    {
      icon: Waves,
      title: "Pureté de la Mer Rouge",
      desc: "Plongez dans les eaux cristallines de Sharm El Sheikh pour un repos absolu.",
    },
    {
      icon: Sparkles,
      title: "Magie du Nil",
      desc: "Vivez une soirée d'exception lors d'un dîner-croisière sur le fleuve légendaire.",
    },
    {
      icon: Camera,
      title: "Contrastes Égyptiens",
      desc: "De l'effervescence des bazars du Caire à la sérénité des récifs coralliens.",
    },
  ];

  return (
    <section className="space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-headline mb-6">L'Expérience Alliance Travel</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Plus qu'un simple voyage, nous vous offrons une immersion sensorielle au cœur de l'histoire, sublimée par un confort moderne.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((h, i) => (
          <div key={i} className="group p-8 glass-panel border-gold/10 rounded-2xl hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <h.icon className="h-7 w-7 text-gold" />
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">{h.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
