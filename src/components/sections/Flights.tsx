"use client";

import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, ArrowRight, Clock, MapPin, ShieldCheck, Check } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/badge";
import { TRIP_CONFIG } from "@/lib/trip-config";
import { cn } from "@/lib/utils";

const FlightRow = memo(({ flight, isSelected, t, isRtl }: any) => (
  <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4 transition-colors", isSelected ? "bg-gold/5" : "hover:bg-gold/5")}>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20">{flight.no}</span>
        <Badge variant="ghost" className="text-[10px] text-teal-400 p-0 font-medium">{flight.type === 'direct' ? t('flights_direct') : t('flights_transit')}</Badge>
      </div>
      <div className="flex items-center gap-2 text-sm font-bold text-foreground">
        <MapPin className="h-3 w-3 text-gold" />{flight.route[0]} <ArrowRight className={isRtl ? "h-3 w-3 text-muted-foreground rotate-180" : "h-3 w-3 text-muted-foreground"} /> {flight.route[1]}
      </div>
    </div>
    <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
      <span className="text-lg font-headline font-bold text-gold">{flight.time}</span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t('info_vols_val')}</span>
    </div>
  </div>
));
FlightRow.displayName = "FlightRow";

export const Flights = memo(({ selectedDate, onSelect }: any) => {
  const { t, isRtl } = useLanguage();
  const flightDetails = [
    { no: "TK 1412", route: ["Constantine", "Istanbul"], type: "direct", time: "13:55 → 19:05" },
    { no: "TK 698", route: ["Istanbul", "Sharm"], type: "transit", time: "02:10 → 05:00 (+1)" },
    { no: "TK 699", route: ["Sharm", "Istanbul"], type: "direct", time: "05:45 → 08:35" },
    { no: "TK 1411", route: ["Istanbul", "Constantine"], type: "direct", time: "11:30 → 13:00" },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRIP_CONFIG.departureDates.map((dep, idx) => {
          const isSelected = selectedDate === dep.label;
          return (
            <Card key={idx} onClick={() => onSelect(dep.label)} className={cn("glass-panel overflow-hidden transition-all duration-500 cursor-pointer relative", isSelected ? "border-gold ring-2 ring-gold shadow-2xl shadow-gold/20" : "border-gold/10 hover:border-gold/30")}>
              {isSelected && <div className="absolute top-4 end-4 z-30 bg-gold text-gold-foreground p-1 rounded-full shadow-xl"><Check className="h-4 w-4" /></div>}
              <CardHeader className={cn("border-b border-gold/10 p-6 transition-colors", isSelected ? "bg-gold/15" : "bg-gold/5")}>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-gold/30 text-gold uppercase tracking-widest text-[10px]">Turkish Airlines</Badge>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{TRIP_CONFIG.duration.label}</div>
                </div>
                <CardTitle className="text-foreground font-headline text-xl flex flex-col gap-2">
                  <div className="flex items-center gap-3"><div className={cn("h-10 w-10 rounded-full flex items-center justify-center", isSelected ? "bg-gold text-gold-foreground scale-110" : "bg-gold/10 text-gold")}><Plane className="h-5 w-5" /></div>{dep.label}</div>
                  <div className="text-xs text-primary font-medium uppercase tracking-wider ps-13">Check-in : {dep.checkIn}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gold/10">
                  {flightDetails.map((f, i) => <FlightRow key={i} flight={f} isSelected={isSelected} t={t} isRtl={isRtl} />)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="max-w-2xl mx-auto p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-4"><ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" /><p className="text-xs text-muted-foreground leading-relaxed italic">* Les horaires sont donnés à titre indicatif par Turkish Airlines.</p></div>
    </div>
  );
});
Flights.displayName = "Flights";
