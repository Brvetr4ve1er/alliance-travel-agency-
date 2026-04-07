
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Itinerary } from "@/components/sections/Itinerary";
import { Hotels } from "@/components/sections/Hotels";
import { Flights } from "@/components/sections/Flights";
import { AIAssistant } from "@/components/AIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Info, 
  MapPin, 
  CalendarDays, 
  Phone, 
  CreditCard, 
  Users, 
  Clock,
  MessageCircle
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <Hero />

      <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <Tabs defaultValue="programme" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-auto flex-wrap justify-center">
              <TabsTrigger value="programme" className="data-[state=active]:bg-gold data-[state=active]:text-gold-foreground py-3 px-6">Programme</TabsTrigger>
              <TabsTrigger value="hotels" className="data-[state=active]:bg-gold data-[state=active]:text-gold-foreground py-3 px-6">Hôtels & Tarifs</TabsTrigger>
              <TabsTrigger value="vols" className="data-[state=active]:bg-gold data-[state=active]:text-gold-foreground py-3 px-6">Plan de vol</TabsTrigger>
              <TabsTrigger value="assistant" className="data-[state=active]:bg-gold data-[state=active]:text-gold-foreground py-3 px-6">IA Assistant</TabsTrigger>
              <TabsTrigger value="infos" className="data-[state=active]:bg-gold data-[state=active]:text-gold-foreground py-3 px-6">Infos pratiques</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="programme" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
              {[
                { date: "05", month: "Avril 2026", ret: "12 Avril" },
                { date: "19", month: "Avril 2026", ret: "26 Avril" },
                { date: "01", month: "Mai 2026", ret: "08 Mai" },
                { date: "09", month: "Mai 2026", ret: "16 Mai" },
              ].map((d, i) => (
                <Card key={i} className="glass-panel text-center hover:border-gold/30 transition-all group">
                  <CardContent className="p-6">
                    <div className="text-4xl font-headline font-bold text-gold mb-1 group-hover:scale-110 transition-transform">{d.date}</div>
                    <div className="text-xs uppercase tracking-widest text-foreground/80 font-medium mb-3">{d.month}</div>
                    <div className="text-[10px] text-teal-400 font-bold uppercase tracking-tight">Retour {d.ret}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Itinerary />
          </TabsContent>

          <TabsContent value="hotels" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Hotels />
          </TabsContent>

          <TabsContent value="vols" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Flights />
          </TabsContent>

          <TabsContent value="assistant" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-3xl mx-auto">
              <AIAssistant />
            </div>
          </TabsContent>

          <TabsContent value="infos" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Info, title: "Visa Égypte", desc: "Lettre de garantie fournie. Visa obtenu à l'arrivée (25 USD)." },
                { icon: Clock, title: "Check-in", desc: "Le check-in est toujours à 14h, quelle que soit l'heure d'arrivée." },
                { icon: Users, title: "Chambres", desc: "Standard: 2 adultes + 2 enfants. Pour 3 adultes: 2 chambres requis." },
                { icon: CreditCard, title: "Tarification", desc: "Basée sur la configuration familiale. Devis gratuit sur demande." },
                { icon: Phone, title: "Contacts", desc: "WhatsApp : 0550 737 434 · 0672 021 651 · 0770 545 737" },
                { icon: MapPin, title: "Agence", desc: "05 Rue des Frères Habbache, Sétif — Face à Park Mall." },
              ].map((info, i) => (
                <Card key={i} className="glass-panel hover:border-gold/30 transition-colors">
                  <CardContent className="p-6">
                    <info.icon className="h-6 w-6 text-gold mb-4" />
                    <h4 className="font-bold mb-2 text-foreground">{info.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{info.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Floating WhatsApp Action */}
      <a 
        href="https://wa.me/213550737434?text=Bonjour, je souhaite réserver l'offre Égypte 2026" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[300] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium">Réserver maintenant</span>
        <MessageCircle className="h-6 w-6" />
      </a>

      <footer className="border-t border-gold/10 py-12 px-6 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-md">
        <p className="mb-2">© 2026 Alliance Travel — Tous droits réservés.</p>
        <p className="font-headline italic text-gold">Votre portail vers les mystères de l'Orient.</p>
      </footer>
    </main>
  );
}
