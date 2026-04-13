
"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, FileUp, UserCheck, Calculator, Users, Baby, Hotel, AlertCircle, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirestore, useStorage, addDocumentNonBlocking } from "@/firebase";
import { TRIP_CONFIG } from "@/lib/trip-config";

interface LeadFormProps {
  initialDate?: string;
  initialHotelId?: string;
  initialRoomType?: "single" | "double" | "triple";
  initialAdults?: number;
  initialChild1?: number;
  initialChild2?: number;
  initialBaby?: number;
  onAdultsChange?: (count: number) => void;
  onChild1Change?: (count: number) => void;
  onChild2Change?: (count: number) => void;
  onBabyChange?: (count: number) => void;
  onRoomTypeChange?: (type: "single" | "double" | "triple") => void;
}

export function LeadForm({ 
  initialDate, 
  initialHotelId, 
  initialRoomType = "double",
  initialAdults = 2,
  initialChild1 = 0,
  initialChild2 = 0,
  initialBaby = 0,
  onAdultsChange,
  onChild1Change,
  onChild2Change,
  onBabyChange,
  onRoomTypeChange
}: LeadFormProps) {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || "");
  const [selectedHotelId, setSelectedHotelId] = useState<string>(initialHotelId || TRIP_CONFIG.hotels[0].id);
  const [selectedCounselor, setSelectedCounselor] = useState<string>(TRIP_CONFIG.mainWhatsApp);
  const [roomType, setRoomType] = useState<"single" | "double" | "triple">(initialRoomType);
  
  // Detailed states
  const [adultCount, setAdultCount] = useState<number>(initialAdults);
  const [child1Count, setChild1Count] = useState<number>(initialChild1);
  const [child2Count, setChild2Count] = useState<number>(initialChild2);
  const [babyCount, setBabyCount] = useState<number>(initialBaby);
  
  const [file, setFile] = useState<File | null>(null);
  
  const firestore = useFirestore();
  const storage = useStorage();

  // Sync with props
  useEffect(() => { if (initialDate) setSelectedDate(initialDate); }, [initialDate]);
  useEffect(() => { if (initialHotelId) setSelectedHotelId(initialHotelId); }, [initialHotelId]);
  useEffect(() => { if (initialRoomType) setRoomType(initialRoomType); }, [initialRoomType]);
  useEffect(() => { if (initialAdults !== undefined) setAdultCount(initialAdults); }, [initialAdults]);
  useEffect(() => { if (initialChild1 !== undefined) setChild1Count(initialChild1); }, [initialChild1]);
  useEffect(() => { if (initialChild2 !== undefined) setChild2Count(initialChild2); }, [initialChild2]);
  useEffect(() => { if (initialBaby !== undefined) setBabyCount(initialBaby); }, [initialBaby]);

  const selectedHotel = TRIP_CONFIG.hotels.find(h => h.id === selectedHotelId) || TRIP_CONFIG.hotels[0];
  
  // Logical Calculation & Validation Engine (Strictly following the provided snippet)
  const priceCalculation = useMemo(() => {
    const p = selectedHotel.pricingGridNum;
    let total = 0;
    let error = null;

    try {
      // 🔒 Validation (CRITICAL)
      if (roomType === "single" && adultCount !== 1) {
        throw new Error(language === 'ar' ? "غرفة فردية = 1 بالغ فقط" : "Chambre Single = 1 adulte seulement");
      }
      if (roomType === "double" && adultCount > 2) {
        throw new Error(language === 'ar' ? "غرفة مزدوجة = 2 بالغين كحد أقصى" : "Chambre Double = max 2 adultes");
      }
      if (roomType === "triple" && adultCount > 3) {
        throw new Error(language === 'ar' ? "غرفة ثلاثية = 3 بالغين كحد أقصى" : "Chambre Triple = max 3 adultes");
      }
      
      const children = (child1Count > 0 ? 1 : 0) + (child2Count > 0 ? 1 : 0);
      if (children > 2) {
        throw new Error(language === 'ar' ? "الحد الأقصى طفلين" : "Maximum 2 enfants autorisés");
      }

      // 🧮 Calculation: [ room type price * number of adults ] + children price + baby price
      total += adultCount * p[roomType];

      // Children supplements
      if (child1Count > 0) total += p.child1;
      if (child2Count > 0) total += p.child2;

      // Infants supplement (multiplied by count as per standard agency logic)
      total += babyCount * p.baby;

    } catch (e: any) {
      error = e.message;
    }

    return { total, error };
  }, [selectedHotel, roomType, adultCount, child1Count, child2Count, babyCount, language]);

  const formattedTotal = new Intl.NumberFormat('fr-DZ').format(priceCalculation.total) + " DA";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (priceCalculation.error) {
      toast({
        variant: "destructive",
        title: language === 'ar' ? "خطأ في التحقق" : "Erreur de validation",
        description: priceCalculation.error,
      });
      return;
    }
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    try {
      let documentUrl = "";

      // 1. Upload File to Storage if exists
      if (file && storage) {
        const storageRef = ref(storage, `leads_documents/${Date.now()}_${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        documentUrl = await getDownloadURL(uploadResult.ref);
      }

      // 2. Prepare Lead Data
      const leadData = {
        name,
        email,
        phone,
        date: selectedDate,
        hotelId: selectedHotelId,
        hotelName: selectedHotel.name,
        roomType,
        adults: adultCount,
        child1: child1Count > 0 ? 1 : 0,
        child2: child2Count > 0 ? 1 : 0,
        babyCount,
        totalPrice: priceCalculation.total,
        message,
        documentUrl,
        counselor: selectedCounselor,
        destination: "Egypt",
        status: "pending",
        createdAt: serverTimestamp(),
      };

      // 3. Save to Firestore (Non-blocking)
      if (firestore) {
        const leadsRef = collection(firestore, "leads");
        addDocumentNonBlocking(leadsRef, leadData);
      }

      // 4. Construct Structured WhatsApp Message
      const docString = documentUrl ? `\n📄 *Document:* ${documentUrl}` : "";
      const childrenTotal = (child1Count > 0 ? 1 : 0) + (child2Count > 0 ? 1 : 0);
      
      const travelersFR = `${adultCount} Adultes${childrenTotal > 0 ? `, ${childrenTotal} Enfant(s)` : ""}${babyCount > 0 ? `, ${babyCount} Bébé(s)` : ""}`;
      const travelersAR = `${adultCount} بالغين${childrenTotal > 0 ? `، ${childrenTotal} أطفال` : ""}${babyCount > 0 ? `، ${babyCount} رضع` : ""}`;
      
      const whatsappMsg = language === 'ar' 
        ? `مرحباً أليانس ترافل! 🇪🇬\n\nأود حجز عرض مصر 2026.\n\n👤 *الاسم:* ${name}\n📞 *الهاتف:* ${phone}\n🏨 *الفندق:* ${selectedHotel.name}\n🛏️ *نوع الغرفة:* ${roomType}\n📅 *التاريخ:* ${selectedDate}\n👥 *المسافرين:* ${travelersAR}\n💰 *السعر الإجمالي:* ${formattedTotal}\n📍 *الوجهة:* مصر${docString}\n\n💬 *ملاحظة:* ${message || "لا يوجد"}`
        : `Bonjour Alliance Travel! 🇪🇬\n\nJe souhaite réserver l'offre Égypte 2026.\n\n👤 *Nom:* ${name}\n📞 *Tél:* ${phone}\n🏨 *Hôtel:* ${selectedHotel.name}\n🛏️ *Chambre:* ${roomType}\n📅 *Date:* ${selectedDate}\n👥 *Voyageurs:* ${travelersFR}\n💰 *Estimation Totale:* ${formattedTotal}\n📍 *Destination:* Égypte${docString}\n\n💬 *Note:* ${message || "Aucune"}`;
      
      const whatsappUrl = `https://wa.me/213${selectedCounselor.substring(1)}?text=${encodeURIComponent(whatsappMsg)}`;

      setLoading(false);
      
      // Redirect to WhatsApp
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
          <Input name="fullName" required placeholder="Ex: Jean Dupont" className="bg-white/5 border-gold/10 focus-visible:ring-gold" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_email')}</label>
          <Input name="email" type="email" required placeholder="Ex: jean@example.com" className="bg-white/5 border-gold/10 focus-visible:ring-gold" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_phone')}</label>
          <Input name="phone" required placeholder="WhatsApp (Ex: 0550...)" className="bg-white/5 border-gold/10 focus-visible:ring-gold" />
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

      {/* Dynamic Group Configuration Section */}
      <div className="space-y-4 p-6 bg-white/5 border border-gold/10 rounded-xl">
        <div className="flex items-center gap-2 text-gold mb-4">
          <Users className="h-5 w-5" />
          <h4 className="text-xs uppercase tracking-widest font-bold">{t('form_v_count')}</h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-tighter opacity-70">Type de Chambre</Label>
            <Select 
              value={roomType} 
              onValueChange={(val: "single" | "double" | "triple") => {
                setRoomType(val);
                onRoomTypeChange?.(val);
              }}
            >
              <SelectTrigger className="bg-background/50 border-gold/20 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="triple">Triple</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-tighter opacity-70">{t('form_v_baby')}</Label>
              <Select 
                value={babyCount.toString()} 
                onValueChange={(val) => {
                  const n = Number(val);
                  setBabyCount(n);
                  onBabyChange?.(n);
                }}
              >
                <SelectTrigger className="bg-background/50 border-gold/20 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 Bébé</SelectItem>
                  <SelectItem value="1">1 Bébé</SelectItem>
                  <SelectItem value="2">2 Bébés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {priceCalculation.error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p className="text-xs font-bold uppercase tracking-widest leading-none">{priceCalculation.error}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">Hôtel Sélectionné</label>
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

      {/* Dynamic Summary Panel */}
      <div className="p-6 bg-gold/10 border border-gold/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
            <Calculator className="h-5 w-5 text-gold" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gold">Estimation Totale du Séjour</div>
            <p className="text-xs text-muted-foreground italic">Calculé selon vos options</p>
          </div>
        </div>
        <div className="text-3xl font-headline font-bold text-foreground">
          {priceCalculation.error ? "--- DA" : formattedTotal}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold">
          {language === 'ar' ? 'الوثائق (صورة جواز السفر)' : 'Documents (Photo du Passeport)'}
        </label>
        <div className="relative group">
          <Input type="file" onChange={handleFileChange} className="bg-white/5 border-gold/10 file:bg-gold file:text-gold-foreground file:border-none file:rounded file:px-2 file:py-1 file:mr-4 file:text-xs file:cursor-pointer focus-visible:ring-gold" accept="image/*,.pdf" />
          <FileUp className="absolute right-3 top-2.5 h-4 w-4 text-gold/50 group-hover:text-gold transition-colors pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold">{t('form_message')}</label>
        <Textarea name="message" placeholder={language === 'ar' ? 'هل لديك طلبات خاصة؟' : 'Demandes particulières, allergies, etc.'} className="bg-white/5 border-gold/10 min-h-[100px] focus-visible:ring-gold" />
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={loading || !!priceCalculation.error} className="w-full bg-gold hover:bg-gold/80 text-gold-foreground h-16 text-xl font-bold shadow-2xl shadow-gold/20 transition-all active:scale-[0.98]">
          {loading ? <Loader2 className="animate-spin" /> : <><Send className="h-5 w-5 me-2" /> {t('form_cta')}</>}
        </Button>
        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
          <ShieldCheck className="h-3 w-3 text-emerald-500" />
          Données sécurisées par Alliance Travel
        </div>
      </div>
    </form>
  );
}
