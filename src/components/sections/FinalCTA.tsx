
"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const WHATSAPP_NUMBERS = [
  "0561616266",
  "0561616267",
  "0561616268",
  "0561616269",
  "0560869905",
  "0560860617",
];

export function FinalCTA() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative rounded-3xl overflow-hidden py-20 px-8 text-center bg-gold/10 border border-gold/20">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]" />
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <Sparkles className="h-12 w-12 text-gold mx-auto animate-pulse" />
        <h2 className="text-4xl md:text-6xl font-headline leading-tight">
          {t('final_title')}
        </h2>
        <p className="text-xl text-muted-foreground font-light">
          {t('final_desc')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-gold text-gold-foreground h-14 px-10 text-lg font-bold w-full sm:w-auto" asChild>
            <a href="#reservation">
              {t('final_cta_primary')} {isRtl ? <ArrowLeft className="ms-2 h-5 w-5" /> : <ArrowRight className="ms-2 h-5 w-5" />}
            </a>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="border-gold/30 text-gold h-14 px-10 text-lg w-full sm:w-auto transition-all hover:bg-gold/5">
                <Phone className="me-2 h-5 w-5" />
                {t('final_cta_secondary')}
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-gold/20 sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline text-gold text-center">
                  {t('final_cta_secondary')}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-3 py-4">
                {WHATSAPP_NUMBERS.map((num) => (
                  <a 
                    key={num}
                    href={`https://wa.me/213${num.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-lg font-medium tracking-wider text-foreground">
                        📲 {num}
                      </span>
                    </div>
                    {isRtl ? (
                      <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                    ) : (
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                    )}
                  </a>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
