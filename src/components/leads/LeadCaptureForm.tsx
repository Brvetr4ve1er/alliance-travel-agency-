"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, Send } from 'lucide-react';

const leadFormSchema = z.object({
  name: z.string().min(2, "Nom complet requis"),
  phone: z.string().min(10, "Numéro de téléphone valide requis (ex: 0550...)"),
  destination: z.string().min(2, "Destination souhaitée"),
  travelDate: z.string().min(1, "Date de voyage souhaitée"),
  message: z.string().min(5, "Message trop court"),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface LeadCaptureFormProps {
  defaultDestination?: string;
  source?: 'web_form' | 'itinerary_gen';
  onSuccess?: () => void;
}

export default function LeadCaptureForm({ defaultDestination = "", source = 'web_form', onSuccess }: LeadCaptureFormProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      destination: defaultDestination,
      travelDate: "",
      message: "",
    },
  });

  async function onSubmit(values: LeadFormValues) {
    if (!firestore) return;
    setIsSubmitting(true);

    const leadData = {
      ...values,
      source,
      status: 'new',
      createdAt: serverTimestamp(),
    };

    addDoc(collection(firestore, 'leads'), leadData)
      .then(() => {
        toast({
          title: "Demande envoyée !",
          description: "Un conseiller Alliance Travel vous contactera très prochainement.",
        });
        form.reset();
        if (onSuccess) onSuccess();
      })
      .catch(async (error) => {
        console.error('Error adding lead:', error);
        const permissionError = new FirestorePermissionError({
          path: 'leads',
          operation: 'create',
          requestResourceData: leadData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/60 uppercase text-[9px] tracking-widest font-bold">Nom Complet</FormLabel>
                <FormControl>
                  <Input placeholder="M. Mohamed" {...field} className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/60 uppercase text-[9px] tracking-widest font-bold">Téléphone (DZ)</FormLabel>
                <FormControl>
                  <Input placeholder="0550 00 00 00" {...field} className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/60 uppercase text-[9px] tracking-widest font-bold">Destination</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Istanbul, Taghit..." {...field} className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="travelDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/60 uppercase text-[9px] tracking-widest font-bold">Date de voyage</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="ex: Juillet 2024" {...field} className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/60 uppercase text-[9px] tracking-widest font-bold">Message / Souhaits</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Dites-nous en plus sur vos attentes..." 
                  className="bg-white/5 border-white/10 text-white min-h-[120px] rounded-2xl resize-none py-4 focus:ring-accent" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-16 rounded-2xl font-bold text-sm shadow-2xl transition-all flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Envoyer ma demande
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
