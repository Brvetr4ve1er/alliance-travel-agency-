
"use client";

import { Camera, Waves, Landmark, Sparkles } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Experience() {
  const highlights = [
    {
      icon: Landmark,
      title: "Éternité de Gizeh",
      desc: "Contemplez les Pyramides et le Sphinx, ultimes témoins des merveilles antiques.",
      imageId: "pyramids"
    },
    {
      icon: Waves,
      title: "Pureté de la Mer Rouge",
      desc: "Plongez dans les eaux cristallines de Sharm El Sheikh pour un repos absolu.",
      imageId: "sharm-beach"
    },
    {
      icon: Sparkles,
      title: "Magie du Nil",
      desc: "Vivez une soirée d'exception lors d'un dîner-croisière sur le fleuve légendaire.",
      imageId: "nile-cruise"
    },
    {
      icon: Camera,
      title: "Contrastes Égyptiens",
      desc: "De l'effervescence des bazars du Caire à la sérénité des récifs coralliens.",
      imageId: "khan-el-khalili"
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
        {highlights.map((h, i) => {
          const image = PlaceHolderImages.find(img => img.id === h.imageId);
          return (
            <div key={i} className="group space-y-6">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gold/20 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <div className="absolute top-4 left-4 z-20 h-10 w-10 rounded-lg bg-gold/90 flex items-center justify-center text-gold-foreground backdrop-blur-sm">
                  <h.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-gold transition-colors">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
