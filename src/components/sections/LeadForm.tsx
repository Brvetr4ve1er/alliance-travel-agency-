
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function LeadForm() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: t('form_toast_title'),
        description: t('form_toast_desc'),
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-2xl border-gold/30 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_name')}</label>
          <Input required className="bg-white/5 border-gold/10" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_phone')}</label>
          <Input required className="bg-white/5 border-gold/10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_date')}</label>
          <Select required>
            <SelectTrigger className="bg-white/5 border-gold/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="05avr">05 Avril 2026</SelectItem>
              <SelectItem value="19avr">19 Avril 2026</SelectItem>
              <SelectItem value="01mai">01 Mai 2026</SelectItem>
              <SelectItem value="09mai">09 Mai 2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold">{t('form_v_count')}</label>
          <Input type="number" min="1" defaultValue="2" className="bg-white/5 border-gold/10" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold">{t('form_message')}</label>
        <Textarea className="bg-white/5 border-gold/10 min-h-[120px]" />
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
