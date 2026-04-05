
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Plane, Hotel, CheckCircle2, 
  XCircle, ChevronRight, Star, Clock, Users, 
  Coffee, Utensils, Landmark, Building2, Mountain, Waves
} from 'lucide-react';
import TopLogo from '@/components/layout/TopLogo';
import FloatingNav from '@/components/layout/FloatingNav';
import WhatsAppFloatingCTA from '@/components/ui/WhatsAppFloatingCTA';

export default function MalaysiaLandingPage() {
  const WHATSAPP_NUMBER = "213550737434"; // Replace with actual number
  const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour Alliance Travel, je suis intéressé(e) par le voyage en Malaisie.");
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <main className="min-h-screen bg-prussian text-sand selection:bg-gold/30 overflow-x-hidden">
      <TopLogo />
      <FloatingNav />
      <WhatsAppFloatingCTA />

      {/* HERO SECTION - Cinematic & Immersive */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=2000"
            alt="Kuala Lumpur Petronas Towers" 
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-prussian/40 via-prussian/60 to-prussian"></div>
          {/* Subtle noise overlay for cinematic feel */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span className="text-sm font-medium tracking-widest uppercase text-sand/80">Alliance Travel Premium</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.9] tracking-tight mb-6"
          >
            MALAISIE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold italic font-light">Autrement.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-sand/70 max-w-2xl font-light mb-12 text-balance"
          >
            Une immersion de 11 jours entre l'effervescence futuriste de Kuala Lumpur et la sérénité des sanctuaires millénaires.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-wide text-prussian bg-gold rounded-full overflow-hidden transition-transform hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                Réserver cette expérience
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* METRICS / HIGHLIGHTS - Asymmetrical Grid */}
      <section className="relative -mt-20 z-20 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Clock />, label: "Durée", value: "11 Jours", sub: "10 Nuits" },
            { icon: <Plane />, label: "Vol", value: "Qatar Airways", sub: "Billet inclus" },
            { icon: <Hotel />, label: "Hébergement", value: "Ibis KLCC", sub: "4 Étoiles" },
            { icon: <Users />, label: "Groupe", value: "Limité", sub: "Places restreintes" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="floating-card rounded-3xl p-6 flex flex-col items-center text-center group hover:bg-white/10 transition-colors"
            >
              <div className="text-gold mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <div className="text-2xl font-serif font-bold text-white mb-1">{item.value}</div>
              <div className="text-xs uppercase tracking-wider text-sand/50">{item.label}</div>
              <div className="text-xs text-sand/40 mt-2">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOTEL SHOWCASE - Split Layout */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-medium tracking-widest uppercase text-gold mb-4">Votre Résidence</h2>
                <h3 className="text-5xl font-serif font-bold text-white leading-tight mb-6">
                  Ibis Kuala Lumpur <br />
                  <span className="italic font-light text-white/50">City Centre</span>
                </h3>
                <p className="text-sand/70 font-light leading-relaxed text-lg">
                  Séjournez au cœur de l'action. À quelques pas des emblématiques tours Petronas, cet établissement 4 étoiles allie design contemporain et confort absolu pour une récupération parfaite après vos explorations.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 pt-6 border-t border-white/10"
              >
                <div className="flex gap-1 text-gold">
                  {[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-sand/60 text-sm tracking-wide">Petit-déjeuner inclus</span>
              </motion.div>
            </div>

            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600" 
                  alt="Hotel Interior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prussian/80 via-transparent to-transparent"></div>
                
                {/* Floating Price Tag */}
                <div className="absolute bottom-8 left-8 floating-card rounded-2xl p-6">
                  <p className="text-sm text-sand/60 uppercase tracking-widest mb-1">À partir de</p>
                  <p className="text-4xl font-serif font-bold text-white">245.000 <span className="text-xl text-gold">DZD</span></p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS - Bento Grid */}
      <section className="py-24 bg-green-accent/10 relative border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">L'Itinéraire</h2>
            </div>
            <div className="lg:col-span-6 flex items-end">
              <p className="text-white/40 text-lg font-light max-w-md">
                Un parcours millimétré pour capturer l'essence de la Malaisie, entre vertige urbain et spiritualité.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Landmark />, title: "Batu Caves", desc: "L'ascension des 272 marches vers le sacré.", img: "https://images.unsplash.com/photo-1524230659092-07f99a75c013?auto=format&fit=crop&q=80&w=800" },
              { icon: <Building2 />, title: "Petronas Towers", desc: "Le sommet du monde moderne à vos pieds.", img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800" },
              { icon: <Mountain />, title: "Genting Highlands", desc: "Une ville dans les nuages à 1800m.", img: "https://images.unsplash.com/photo-1626014303757-636611689477?auto=format&fit=crop&q=80&w=800" },
              { icon: <Waves />, title: "Aquaria KLCC", desc: "L'océan au cœur de la métropole.", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800" },
              { icon: <Landmark />, title: "Palais Royal", desc: "L'élégance de la monarchie malaise.", img: "https://images.unsplash.com/photo-1621319330343-9669599a3701?auto=format&fit=crop&q=80&w=800" },
              { icon: <Utensils />, title: "Gastronomie", desc: "Une explosion de saveurs asiatiques.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/5"
              >
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-prussian via-prussian/20 to-transparent"></div>
                <div className="absolute inset-0 p-10 flex flex-col justify-end space-y-4">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-green-accent mb-2">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-serif font-bold">{item.title}</h4>
                  <p className="text-sand/60 font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUSIONS & EXCLUSIONS - Clean Data Display */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Inclus */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="floating-card rounded-[3rem] p-12"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-serif font-bold">L'Expérience Inclut</h3>
              </div>
              <ul className="space-y-6">
                {[
                  "Billet d'avion aller-retour via Qatar Airways",
                  "Hébergement 10 nuits à l'hôtel Ibis KLCC (4★)",
                  "Petits-déjeuners quotidiens",
                  "Transferts aéroport-hôtel-aéroport",
                  "Excursions mentionnées avec guide francophone/arabophone",
                  "Assistance Alliance Travel 24/7"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-sand/80 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0"></span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Non Inclus */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="floating-card rounded-[3rem] p-12 bg-black/20"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-serif font-bold">Non Inclus</h3>
              </div>
              <ul className="space-y-6">
                {[
                  "Frais de visa (si applicable)",
                  "Assurance voyage multirisques",
                  "Déjeuners et dîners",
                  "Dépenses personnelles et pourboires",
                  "Taxe de séjour (à régler sur place)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-sand/60 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 shrink-0"></span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Immersive */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541359927273-d76820fc43f9?auto=format&fit=crop&q=80&w=2000" 
            alt="Malaysia Landscape" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prussian via-prussian/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">Prêt pour l'évasion ?</h2>
            <p className="text-xl text-sand/70 font-light mb-12">
              Contactez nos conseillers pour personnaliser votre expérience ou réserver votre place pour le prochain départ.
            </p>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-prussian rounded-full font-medium text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              Contacter via WhatsApp
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-sand/40 text-sm font-light tracking-wide">
          © {new Date().getFullYear()} Alliance Travel. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
