
"use client";

import React, { memo } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TRIP_CONFIG } from "@/lib/trip-config";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";

export const PriceSummaryBar = memo(() => {
  const { t } = useLanguage();
  const { selectedHotelId, selectedDate, selectedRoomType, adultCount, child1Count, child2Count, babyCount, priceData } = useBooking();
  
  const hotel = TRIP_CONFIG.hotels.find(h => h.id === selectedHotelId) || TRIP_CONFIG.hotels[0];
  const formattedPrice = new Intl.NumberFormat('fr-DZ').format(priceData.total) + " DA";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[250] bg-background/90 backdrop-blur-md border-t border-gold/20 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          {priceData.error ? (
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-widest">{priceData.error}</p>
            </div>
          ) : (
            <>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Selection : {hotel.name}</p>
              <p className="text-xs text-foreground/80 font-medium capitalize">
                {selectedDate} · {selectedRoomType} · {adultCount} {t('form_v_adults')} 
                {child1Count + child2Count > 0 && ` + ${(child1Count > 0 ? 1 : 0) + (child2Count > 0 ? 1 : 0)} Enfant(s)`}
                {babyCount > 0 && ` + ${babyCount} Bébé(s)`}
              </p>
            </>
          )}
        </div>
        <div className="flex-1 flex items-center justify-end gap-6">
          {!priceData.error && (
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Total Séjour</p>
              <p className="text-2xl font-headline font-bold text-foreground">{formattedPrice}</p>
            </div>
          )}
          <Button className="bg-gold hover:bg-gold/80 text-gold-foreground font-bold px-8 h-12 shadow-lg shadow-gold/20" asChild>
            <a href="#reservation">
              {t('nav_reserver')}
              <ArrowRight className="h-4 w-4 ms-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
});
PriceSummaryBar.displayName = "PriceSummaryBar";
