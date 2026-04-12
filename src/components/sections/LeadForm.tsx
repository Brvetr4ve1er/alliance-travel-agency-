
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export function LeadForm() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const travelers = formData.get("travelerCount") as string;
    const message = formData.get("message") as string;

    const leadData = {
      name,
      phone,
      date: selectedDate,
      travelers: Number(travelers),
      message,
      destination: "Egypt",
      createdAt: serverTimestamp(),
    };

    const leadsRef = collection(db, "leads");

    addDoc(leadsRef, leadData)
      .then(() => {
        setLoading(false);
        
        // Generate WhatsApp message
        const whatsappMsg = `Bonjour Alliance Travel! 🇪🇬\n\nJe souhaite réserver l'offre Égypte 2026.\n\n👤 *Nom:* ${name}\n📞 *Tél:* ${phone}\n📅 *Date:* ${selectedDate}\n👥 *Voyageurs:* ${travelers}\n📍 *Destination:* Égypte\n\n💬 *Note:* ${message || "Aucune"}`;
        
        const encodedMsg = encodeURIComponent(whatsappMsg);
        // Updated to the requested primary number: 0561 616 267
        const whatsappUrl = `https://wa.me/213561616267?text=${encodedMsg}`;

        // Open WhatsApp
        window.open(whatsappUrl, "_blank");

        toast({
          title: t('form_toast_title'),
          description: t('form_toast_desc'),
        });

        (e.target as HTMLFormElement).reset();
        setSelectedDate("");
      })
      .catch(async (error) => {
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: leadsRef.path,
          operation: 'create',
          requestResourceData: leadData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-2xl border-gold/30 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_name')}</label>
          <Input 
            name="fullName"
            required 
            placeholder="Ex: Jean Dupont"
            className="bg-white/5 border-gold/10" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_phone')}</label>
          <Input 
            name="phone"
            required 
            placeholder="WhatsApp (Ex: 0550...)"
            className="bg-white/5 border-gold/10" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_date')}</label>
          <Select required onValueChange={setSelectedDate} value={selectedDate}>
            <SelectTrigger className="bg-white/5 border-gold/10">
              <SelectValue placeholder={language === 'ar' ? 'اختر التاريخ' : 'Choisir une date'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="05 Avril 2026">05 Avril 2026</SelectItem>
              <SelectItem value="19 Avril 2026">19 Avril 2026</SelectItem>
              <SelectItem value="01 Mai 2026">01 Mai 2026</SelectItem>
              <SelectItem value="09 Mai 2026">09 Mai 2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_v_count')}</label>
          <Input 
            name="travelerCount"
            type="number" 
            min="1" 
            defaultValue="2" 
            className="bg-white/5 border-gold/10" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold">{t('form_message')}</label>
        <Textarea 
          name="message"
          placeholder={language === 'ar' ? 'أسئلة إضافية...' : 'Questions supplémentaires...'}
          className="bg-white/5 border-gold/10 min-h-[120px]" 
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold/80 text-gold-foreground h-14 text-lg font-bold">
        {loading ? <Loader2 className="animate-spin" /> : <><Send className="h-5 w-5 mx-2" /> {t('form_cta')}</>}
      </Button>
      
      <p className="text-[10px] text-center text-muted-foreground italic">
        {language === 'ar' ? 'بإرسال هذا النموذج، فإنك توافق على أن يتم الاتصال بك من قبل مستشارينا الفنيين.' : 'En soumettant ce formulaire, vous acceptez d\'être recontacté par nos conseillers techniques.'}
      </p>
    </form>
  );
}
