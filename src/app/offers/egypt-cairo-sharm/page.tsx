
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Plane, 
  Hotel, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Navigation, 
  MessageCircle, 
  Star,
  ChevronRight,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { formatPriceDZD } from '@/lib/utils';
import FloatingNav from '@/components/layout/FloatingNav';
import TopLogo from '@/components/layout/TopLogo';
import WhatsAppFloatingCTA from '@/components/ui/WhatsAppFloatingCTA';

const EGYPT_DATA = {
  title: "Égypte : Le Nil & La Mer Rouge",
  subtitle: "Une odyssée entre pyramides millénaires et lagons de cristal.",
  duration: "7 Nuits / 8 Jours",
  departure: "Départ d'Alger",
  basePrice: 180000,
  dates: ["05 Avril — 12 Avril", "19 Avril — 26 Avril"],
  inclusions: [
    "Vols Internationaux & Domestiques",
    "5 Nuits à Sharm (All Inclusive)",
    "2 Nuits au Caire (Petit-déjeuner)",
    "Transferts VIP Aéroports / Hôtels",
    "Excursions guidées privées"
  ],
  locations: [
    {
      name: "Sharm El Sheikh",
      highlights: ["Naama Bay", "Soho Square", "Old Market"]
    },
    {
      name: "Le Caire",
      highlights: ["Pyramides de Gizeh", "Khan El Khalili", "Dîner Croisière sur le Nil"]
    }
  ],
  hotels: [
    { name: "Verginia Aqua Park", stars: 4, price: 180000, isPremium: false },
    { name: "Rehana Royal Beach", stars: 5, price: 227000, isPremium: true },
    { name: "Pickalbatros Resort", stars: 5, price: 265000, isPremium: true }
  ],
  flights: [
    { route: "Alger → Le Caire → Sharm", type: "Aller" },
    { route: "Sharm → Le Caire → Alger", type: "Retour" }
  ]
};

export default function EgyptLandingPage() {
  const whatsappUrl = `https://wa.me/213555555555?text=${encodeURIComponent("Bonjour Alliance Travel, je souhaite réserver l'offre Égypte : Le Nil & La Mer Rouge.")}`;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <TopLogo />
      <FloatingNav />
      <WhatsAppFloatingCTA />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1920"
          alt="Egypt Pyramids"
          fill
          className="object-cover opacity-50 scale-105"
          priority
          data-ai-hint="Egypt Pyramids"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center gap-4 text-accent font-sans text-[10px] uppercase tracking-[0.6em] font-bold">
              <MapPin className="w-3 h-3" />
              Expédition Signature — {EGYPT_DATA.departure}
            </div>
            
            <h1 className="text-6xl md:text-9xl font-serif text-white italic leading-tight tracking-tighter">
              {EGYPT_DATA.title}
            </h1>
            
            <p className="text-white/60 text-lg md:text-2xl font-serif italic max-w-2xl mx-auto">
              {EGYPT_DATA.subtitle}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-12">
              <div className="text-left border-l border-accent/40 pl-6">
                <p className="text-[10px] text-accent uppercase tracking-widest font-bold mb-1">Durée</p>
                <p className="text-white font-serif italic text-xl">{EGYPT_DATA.duration}</p>
              </div>
              <div className="text-left border-l border-accent/40 pl-6">
                <p className="text-[10px] text-accent uppercase tracking-widest font-bold mb-1">Prix Privilège</p>
                <p className="text-white font-serif italic text-xl">Dès {formatPriceDZD(EGYPT_DATA.basePrice)}</p>
              </div>
            </div>
            
            <motion.a 
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 bg-accent text-accent-foreground px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl mt-12"
            >
              Réserver l'expérience <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 2. INCLUSIONS SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif text-white italic">Inclusions <br/>Prestige</h2>
            <div className="h-px w-24 bg-accent/40" />
            <p className="text-white/40 text-sm leading-relaxed">
              Nous avons distillé le meilleur de l'Égypte dans un forfait tout-en-un conçu pour votre sérénité.
            </p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {EGYPT_DATA.inclusions.map((item, i) => (
              <div key={i} className="flex items-center gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-accent/20 transition-colors group">
                <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-white/70 text-sm font-medium tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROGRAM SECTION */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <p className="text-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4">L'Itinéraire</p>
            <h2 className="text-5xl font-serif text-white italic">Le Récit du Voyage</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {EGYPT_DATA.locations.map((loc, i) => (
              <div key={i} className="space-y-10 group">
                <div className="relative aspect-video overflow-hidden rounded-[2.5rem] border border-white/10">
                  <Image 
                    src={i === 0 ? "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800" : "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=800"}
                    alt={loc.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    data-ai-hint={loc.name}
                  />
                  <div className="absolute inset-0 bg-background/40" />
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-3xl font-serif text-white italic">{loc.name}</h3>
                  </div>
                </div>
                
                <ul className="space-y-6">
                  {loc.highlights.map((highlight, j) => (
                    <li key={j} className="flex items-center gap-4 text-white/50 group-hover:text-white/80 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-sm font-medium uppercase tracking-widest">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOTELS SECTION */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-serif text-white italic mb-6">Sélection Hôtelière</h2>
          <p className="text-white/30 text-xs uppercase tracking-[0.4em]">Choisissez votre niveau d'exception</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {EGYPT_DATA.hotels.map((hotel, i) => (
            <div key={i} className={`glass-panel p-10 space-y-8 relative overflow-hidden group ${hotel.isPremium ? 'border-accent/30' : 'border-white/5'}`}>
              {hotel.isPremium && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-6 py-1 text-[8px] font-bold uppercase tracking-widest -rotate-45 translate-x-[25%] translate-y-[50%]">
                  Coup de Coeur
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(hotel.stars)].map((_, s) => <Star key={s} className="w-3 h-3 fill-accent text-accent" />)}
                </div>
                <h3 className="text-2xl font-serif text-white italic">{hotel.name}</h3>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-white/20 uppercase tracking-widest">Forfait Total / Personne</p>
                <p className="text-3xl font-sans font-bold text-white">{formatPriceDZD(hotel.price)}</p>
              </div>

              <button className="w-full h-14 border border-white/10 text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl">
                Sélectionner
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DATES SECTION & 6. FLIGHTS SECTION */}
      <section className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          <div className="space-y-12">
            <h3 className="text-3xl font-serif text-white italic">Dates de Départ</h3>
            <div className="space-y-4">
              {EGYPT_DATA.dates.map((date, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-background border border-white/5 rounded-2xl group hover:border-accent/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="text-white/80 font-medium tracking-tight">{date}</span>
                  </div>
                  <div className="text-[10px] text-accent font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Disponible
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-3xl font-serif text-white italic">Plan de Vol</h3>
            <div className="space-y-6">
              {EGYPT_DATA.flights.map((flight, i) => (
                <div key={i} className="flex items-center gap-8 py-6 border-b border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Plane className={`w-5 h-5 ${flight.type === 'Retour' ? 'rotate-180' : ''}`} />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/20 uppercase tracking-widest mb-1">{flight.type}</p>
                    <p className="text-white font-medium tracking-wide">{flight.route}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section id="booking" className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <p className="text-accent text-[10px] font-bold tracking-[0.5em] uppercase">Disponibilités Limitées</p>
            <h2 className="text-5xl md:text-8xl font-serif text-white italic leading-none">Vivez l'Égypte <br/>Signature.</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href={whatsappUrl}
              target="_blank"
              className="w-full md:w-auto flex items-center justify-center gap-4 bg-[#25D366] text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Réserver par WhatsApp
            </a>
            
            <button className="w-full md:w-auto flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl hover:bg-white/90 transition-all">
              Demander un Devis VIP
            </button>
          </div>

          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Paiement Sécurisé", icon: ShieldCheck },
              { label: "Expertise DZ", icon: MapPin },
              { label: "Assistance 24/7", icon: Clock },
              { label: "Vols Garantis", icon: Navigation }
            ].map((sig, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <sig.icon className="w-5 h-5 text-accent/40" />
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">{sig.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.6em]">Alliance Travel DZ — Excellence en Égypte</p>
      </footer>
    </main>
  );
}
