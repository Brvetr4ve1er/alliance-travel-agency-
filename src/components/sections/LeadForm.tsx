"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, FileUp, UserCheck, Calculator, Users, Baby } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirestore, useStorage, addDocumentNonBlocking } from "@/firebase";
import { TRIP_CONFIG } from "@/lib/trip-config";

interface LeadFormProps {
  initialDate?: string;
  initialHotelId?: string;
  initialAdults?: number;
  initialChild1?: number;
  initialChild2?: number;
  initialBaby?: boolean;
  onAdultsChange?: (count: number) => void;
  onChild1Change?: (count: number) => void;
  onChild2Change?: (count: number) => void;
  onBabyChange?: (val: boolean) => void;
}

export function LeadForm({ 
  initialDate, 
  initialHotelId, 
  initialAdults = 2,
  initialChild1 = 0,
  initialChild2 = 0,
  initialBaby = false,
  onAdultsChange,
  onChild1Change,
  onChild2Change,
  onBabyChange
}: LeadFormProps) {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || "");
  const [selectedHotelId, setSelectedHotelId] = useState<string>(initialHotelId || TRIP_CONFIG.hotels[0].id);
  const [selectedCounselor, setSelectedCounselor] = useState<string>(TRIP_CONFIG.mainWhatsApp);
  
  // Detailed states
  const [adultCount, setAdultCount] = useState<number>(initialAdults);
  const [child1Count, setChild1Count] = useState<number>(initialChild1);
  const [child2Count, setChild2Count] = useState<number>(initialChild2);
  const [hasBaby, setHasBaby] = useState<boolean>(initialBaby);
  
  const [file, setFile] = useState<File | null>(null);
  
  const firestore = useFirestore();
  const storage = useStorage();

  // Sync with props
  useEffect(() => { if (initialDate) setSelectedDate(initialDate); }, [initialDate]);
  useEffect(() => { if (initialHotelId) setSelectedHotelId(initialHotelId); }, [initialHotelId]);
  useEffect(() => { if (initialAdults !== undefined) setAdultCount(initialAdults); }, [initialAdults]);
  useEffect(() => { if (initialChild1 !== undefined) setChild1Count(initialChild1); }, [initialChild1]);
  useEffect(() => { if (initialChild2 !== undefined) setChild2Count(initialChild2); }, [initialChild2]);
  useEffect(() => { if (initialBaby !== undefined) setHasBaby(initialBaby); }, [initialBaby]);

  const selectedHotel = TRIP_CONFIG.hotels.find(h => h.id === selectedHotelId) || TRIP_CONFIG.hotels[0];
  
  const totalPrice = (() => {
    let basePricePerAdult = selectedHotel.pricingGridNum.double;
    if (adultCount === 1) basePricePerAdult = selectedHotel.pricingGridNum.single;
    else if (adultCount === 3) basePricePerAdult = selectedHotel.pricingGridNum.triple;
    
    let total = basePricePerAdult * adultCount;
    if (child1Count > 0) total += selectedHotel.pricingGridNum.child1;
    if (child2Count > 0) total += selectedHotel.pricingGridNum.child2;
    if (hasBaby) total += selectedHotel.pricingGridNum.baby;
    return total;
  })();

  const formattedTotal = new Intl.NumberFormat('fr-DZ').format(totalPrice) + " DA";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    try {
      let documentUrl = "";

      if (file && storage) {
        const storageRef = ref(storage, `leads_documents/${Date.now()}_${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        documentUrl = await getDownloadURL(uploadResult.ref);
      }

      const leadData = {
        name,
        email,
        phone,
        date: selectedDate,
        hotelId: selectedHotelId,
        hotelName: selectedHotel.name,
        adults: adultCount,
        child1: child1Count,
        child2: child2Count,
        hasBaby,
        totalPrice: totalPrice,
        message,
        documentUrl,
        counselor: selectedCounselor,
        destination: "Egypt",
        createdAt: serverTimestamp(),
      };

      if (firestore) {
        const leadsRef = collection(firestore, "leads");
        addDocumentNonBlocking(leadsRef, leadData);
      }

      const docString = documentUrl ? `\n📄 *Document:* ${documentUrl}` : "";
      const travelersString = `${adultCount} Adultes, ${child1Count + child2Count} Enfants, ${hasBaby ? '1' : '0'} Bébé`;
      
      const whatsappMsg = language === 'ar' 
        ? `مرحباً أليانس ترافل! 🇪🇬\n\nأود حجز عرض مصر 2026.\n\n👤 *الاسم:* ${name}\n🏨 *الفندق:* ${selectedHotel.name}\n📅 *التاريخ:* ${selectedDate}\n👥 *المسافرين:* ${travelersString}\n💰 *الإجمالي:* ${formattedTotal}\n📍 *الوجهة:* مصر${docString}\n\n💬 *ملاحظة:* ${message || "لا يوجد"}`
        : `Bonjour Alliance Travel! 🇪🇬\n\nJe souhaite réserver l'offre Égypte 2026.\n\n👤 *Nom:* ${name}\n🏨 *Hôtel:* ${selectedHotel.name}\n📅 *Date:* ${selectedDate}\n👥 *Voyageurs:* ${travelersString}\n💰 *Total Estimé:* ${formattedTotal}\n📍 *Destination:* Égypte${docString}\n\n💬 *Note:* ${message || "Aucune"}`;
      
      const whatsappUrl = `https://wa.me/213${selectedCounselor.substring(1)}?text=${encodeURIComponent(whatsappMsg)}`;

      setLoading(false);
      window.open(whatsappUrl, "_blank");

      toast({
        title: t('form_toast_title'),
        description: t('form_toast_desc'),
      });

      (e.target as HTMLFormElement).reset();
      setFile(null);

    } catch (error: any) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: language === 'ar' ? 'خطأ' : 'Erreur',
        description: error.message || (language === 'ar' ? 'فشل إرسال الطلب' : 'Échec de l\'envoi de la demande'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-2xl border-gold/30 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_name')}</label>
          <Input name="fullName" required placeholder="Ex: Jean Dupont" className="bg-white/5 border-gold/10" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_email')}</label>
          <Input name="email" type="email" required placeholder="Ex: jean@example.com" className="bg-white/5 border-gold/10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_phone')}</label>
          <Input name="phone" required placeholder="WhatsApp (Ex: 0550...)" className="bg-white/5 border-gold/10" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_date')}</label>
          <Select required onValueChange={setSelectedDate} value={selectedDate}>
            <SelectTrigger className="bg-white/5 border-gold/10">
              <SelectValue placeholder={language === 'ar' ? 'اختر التاريخ' : 'Choisir une date'} />
            </SelectTrigger>
            <SelectContent>
              {TRIP_CONFIG.departureDates.map((date) => (
                <SelectItem key={date.label} value={date.label}>{date.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 p-6 bg-white/5 border border-gold/10 rounded-xl">
        <div className="flex items-center gap-2 text-gold mb-4">
          <Users className="h-5 w-5" />
          <h4 className="text-xs uppercase tracking-widest font-bold">{t('form_v_count')}</h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-tighter opacity-70">{t('form_v_adults')}</Label>
            <Select 
              value={adultCount.toString()} 
              onValueChange={(val) => {
                const n = Number(val);
                setAdultCount(n);
                onAdultsChange?.(n);
              }}
            >
              <SelectTrigger className="bg-background/50 border-gold/20 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Adulte</SelectItem>
                <SelectItem value="2">2 Adultes</SelectItem>
                <SelectItem value="3">3 Adultes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col justify-end space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="child1" 
                checked={child1Count > 0} 
                onCheckedChange={(checked) => {
                  const n = checked ? 1 : 0;
                  setChild1Count(n);
                  onChild1Change?.(n);
                }}
              />
              <Label htmlFor="child1" className="text-xs cursor-pointer">{t('form_v_child1')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="child2" 
                checked={child2Count > 0} 
                onCheckedChange={(checked) => {
                  const n = checked ? 1 : 0;
                  setChild2Count(n);
                  onChild2Change?.(n);
                }}
              />
              <Label htmlFor="child2" className="text-xs cursor-pointer">{t('form_v_child2')}</Label>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="baby" 
                checked={hasBaby} 
                onCheckedChange={(checked) => {
                  const val = checked === true;
                  setHasBaby(val);
                  onBabyChange?.(val);
                }}
              />
              <Label htmlFor="baby" className="text-xs flex items-center gap-1 cursor-pointer">
                <Baby className="h-3 w-3 text-gold" />
                {t('form_v_baby')}
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">Hôtel</label>
          <Select required onValueChange={setSelectedHotelId} value={selectedHotelId}>
            <SelectTrigger className="bg-white/5 border-gold/10">
              <SelectValue placeholder="Choisir un hôtel" />
            </SelectTrigger>
            <SelectContent>
              {TRIP_CONFIG.hotels.map((hotel) => (
                <SelectItem key={hotel.id} value={hotel.id}>
                  {hotel.name} ({hotel.stars}★)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_counselor')}</label>
          <Select required onValueChange={setSelectedCounselor} value={selectedCounselor}>
            <SelectTrigger className="bg-white/5 border-gold/10">
              <SelectValue placeholder={language === 'ar' ? 'اختر مستشاراً' : 'Choisir un conseiller'} />
            </SelectTrigger>
            <SelectContent>
              {TRIP_CONFIG.counselors.map((num) => (
                <SelectItem key={num} value={num}>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-3 w-3 text-gold" />
                    <span>📲 {num}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator className="h-5 w-5 text-gold" />
          <div className="text-xs uppercase tracking-widest font-bold text-gold">Estimation Totale</div>
        </div>
        <div className="text-2xl font-headline font-bold text-foreground">{formattedTotal}</div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold">
          {language === 'ar' ? 'الوثائق (جواز السفر، إلخ)' : 'Documents (Passeport, etc.)'}
        </label>
        <div className="relative group">
          <Input type="file" onChange={handleFileChange} className="bg-white/5 border-gold/10 file:bg-gold file:text-gold-foreground file:border-none file:rounded file:px-2 file:py-1 file:mr-4 file:text-xs file:cursor-pointer" accept="image/*,.pdf" />
          <FileUp className="absolute right-3 top-2.5 h-4 w-4 text-gold/50 group-hover:text-gold transition-colors pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold">{t('form_message')}</label>
        <Textarea name="message" placeholder={language === 'ar' ? 'أسئلة إضافية...' : 'Questions supplémentaires...'} className="bg-white/5 border-gold/10 min-h-[120px]" />
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold/80 text-gold-foreground h-14 text-lg font-bold">
        {loading ? <Loader2 className="animate-spin" /> : <><Send className="h-5 w-5 mx-2" /> {t('form_cta')}</>}
      </Button>
    </form>
  );
}
