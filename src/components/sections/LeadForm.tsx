"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, FileUp, UserCheck, Calculator, Users, Baby, AlertCircle, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useBooking } from "@/components/providers/BookingProvider";
import { collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirestore, useStorage, addDocumentNonBlocking } from "@/firebase";
import { TRIP_CONFIG } from "@/lib/trip-config";

export function LeadForm() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { 
    selectedDate, setSelectedDate, selectedHotelId, setSelectedHotelId, 
    selectedRoomType, setSelectedRoomType, adultCount, setAdultCount, 
    child1Count, setChild1Count, child2Count, setChild2Count, babyCount, setBabyCount, priceData 
  } = useBooking();
  
  const [loading, setLoading] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<string>(TRIP_CONFIG.mainWhatsApp);
  const [file, setFile] = useState<File | null>(null);
  
  const firestore = useFirestore();
  const storage = useStorage();

  const formattedTotal = new Intl.NumberFormat('fr-DZ').format(priceData.total) + " DA";
  const selectedHotel = TRIP_CONFIG.hotels.find(h => h.id === selectedHotelId) || TRIP_CONFIG.hotels[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (priceData.error) return toast({ variant: "destructive", title: "Erreur", description: priceData.error });
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    try {
      let documentUrl = "";
      if (file && storage) {
        const sRef = ref(storage, `leads/${Date.now()}_${file.name}`);
        const res = await uploadBytes(sRef, file);
        documentUrl = await getDownloadURL(res.ref);
      }

      const lead = {
        name: fd.get("fullName"), email: fd.get("email"), phone: fd.get("phone"), date: selectedDate, hotelId: selectedHotelId, hotelName: selectedHotel.name, roomType: selectedRoomType, adults: adultCount, child1: child1Count, child2: child2Count, babyCount, totalPrice: priceData.total, message: fd.get("message"), documentUrl, counselor: selectedCounselor, status: "pending", createdAt: serverTimestamp()
      };

      if (firestore) addDocumentNonBlocking(collection(firestore, "leads"), lead);

      const msg = `Bonjour Alliance Travel! 🇪🇬\n\nNom: ${lead.name}\nTél: ${lead.phone}\nHôtel: ${lead.hotelName}\nChambre: ${lead.roomType}\nDate: ${lead.date}\nTotal: ${formattedTotal}`;
      window.open(`https://wa.me/213${selectedCounselor.substring(1)}?text=${encodeURIComponent(msg)}`, "_blank");

      toast({ title: t('form_toast_title'), description: t('form_toast_desc') });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erreur", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-2xl border-gold/30 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2"><Label className="text-[10px] uppercase tracking-widest">{t('form_name')}</Label><Input name="fullName" required className="bg-white/5" /></div>
        <div className="space-y-2"><Label className="text-[10px] uppercase tracking-widest">{t('form_email')}</Label><Input name="email" type="email" required className="bg-white/5" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2"><Label className="text-[10px] uppercase tracking-widest">{t('form_phone')}</Label><Input name="phone" required className="bg-white/5" /></div>
        <div className="space-y-2"><Label className="text-[10px] uppercase tracking-widest">{t('form_date')}</Label>
          <Select onValueChange={setSelectedDate} value={selectedDate}><SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger><SelectContent>{TRIP_CONFIG.departureDates.map(d => <SelectItem key={d.label} value={d.label}>{d.label}</SelectItem>)}</SelectContent></Select>
        </div>
      </div>
      <div className="space-y-4 p-6 bg-white/5 border border-gold/10 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2"><Label className="text-[10px] uppercase">Chambre</Label>
            <Select value={selectedRoomType} onValueChange={(v: any) => setSelectedRoomType(v)}><SelectTrigger className="bg-background/50 h-9"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="double">Double</SelectItem><SelectItem value="triple">Triple</SelectItem></SelectContent></Select>
          </div>
          <div className="space-y-2"><Label className="text-[10px] uppercase">Adultes</Label>
            <Select value={adultCount.toString()} onValueChange={v => setAdultCount(Number(v))}><SelectTrigger className="bg-background/50 h-9"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1 Adulte</SelectItem><SelectItem value="2">2 Adultes</SelectItem><SelectItem value="3">3 Adultes</SelectItem></SelectContent></Select>
          </div>
          <div className="flex flex-col justify-end space-y-3"><div className="flex items-center space-x-2"><Checkbox id="c1" checked={child1Count > 0} onCheckedChange={c => setChild1Count(c ? 1 : 0)} /><Label htmlFor="c1" className="text-xs">1er Enfant</Label></div><div className="flex items-center space-x-2"><Checkbox id="c2" checked={child2Count > 0} onCheckedChange={c => setChild2Count(c ? 1 : 0)} /><Label htmlFor="c2" className="text-xs">2ème Enfant</Label></div></div>
          <div className="space-y-2"><Label className="text-[10px] uppercase">Bébé</Label>
            <Select value={babyCount.toString()} onValueChange={v => setBabyCount(Number(v))}><SelectTrigger className="bg-background/50 h-9"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0">0</SelectItem><SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem></SelectContent></Select>
          </div>
        </div>
        {priceData.error && <div className="p-3 bg-red-500/10 text-red-400 text-xs flex gap-2"><AlertCircle className="h-4 w-4" />{priceData.error}</div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2"><Label className="text-[10px] uppercase">Hôtel</Label>
          <Select onValueChange={setSelectedHotelId} value={selectedHotelId}><SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger><SelectContent>{TRIP_CONFIG.hotels.map(h => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="space-y-2"><Label className="text-[10px] uppercase">Conseiller</Label>
          <Select onValueChange={setSelectedCounselor} value={selectedCounselor}><SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger><SelectContent>{TRIP_CONFIG.counselors.map(c => <SelectItem key={c} value={c}>📲 {c}</SelectItem>)}</SelectContent></Select>
        </div>
      </div>
      <div className="p-6 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-between"><div className="text-[10px] uppercase text-gold font-bold">Estimation Totale</div><div className="text-3xl font-headline font-bold">{priceData.error ? "--- DA" : formattedTotal}</div></div>
      <div className="space-y-2"><Label className="text-[10px] uppercase">Passeport</Label><div className="relative"><Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="bg-white/5" accept="image/*,.pdf" /><FileUp className="absolute right-3 top-2.5 h-4 w-4 text-gold/50" /></div></div>
      <div className="space-y-2"><Label className="text-[10px] uppercase">Message</Label><Textarea name="message" className="bg-white/5 min-h-[100px]" /></div>
      <Button type="submit" disabled={loading || !!priceData.error} className="w-full bg-gold hover:bg-gold/80 h-16 text-xl font-bold">{loading ? <Loader2 className="animate-spin" /> : <><Send className="h-5 w-5 me-2" /> {t('form_cta')}</>}</Button>
      <div className="text-center text-[10px] text-muted-foreground uppercase"><ShieldCheck className="h-3 w-3 inline me-1" /> Données sécurisées</div>
    </form>
  );
}
