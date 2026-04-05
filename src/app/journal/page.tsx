
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FloatingNav from '@/components/layout/FloatingNav';
import TopLogo from '@/components/layout/TopLogo';
import { useCollection } from '@/firebase';
import { BlogPost } from '@/lib/types';
import { Loader2, ArrowRight, Calendar, User } from 'lucide-react';
import WhatsAppFloatingCTA from '@/components/ui/WhatsAppFloatingCTA';

export default function JournalPage() {
  const { data: posts, loading } = useCollection<BlogPost>('blog_posts');

  return (
    <main className="min-h-screen bg-background text-foreground pb-24 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <TopLogo />
      <FloatingNav />
      <WhatsAppFloatingCTA />

      <div className="max-w-7xl mx-auto px-6 pt-32">
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-4"
          >
            Elite Insights
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-8xl font-bold leading-none tracking-tighter"
          >
            Le <span className="text-primary italic">Journal</span> d'Alliance
          </motion.h1>
          <p className="mt-6 text-white/40 text-sm max-w-xl font-mono uppercase tracking-widest leading-relaxed">
            Histoires d'évasions, guides exclusifs et inspirations pour le voyageur algérien d'exception.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-4 text-white/20">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-[10px] uppercase tracking-widest font-mono">Chargement des histoires...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts?.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:border-accent/40 transition-colors shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage || 'https://picsum.photos/seed/journal/800/500'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    data-ai-hint="Travel story cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-6 text-[9px] uppercase tracking-widest font-mono text-white/30">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-accent" /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-DZ') : 'Recent'}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-accent" /> {post.author}</span>
                  </div>

                  <h2 className="text-2xl font-headline font-bold text-white mb-4 group-hover:text-accent transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-white/40 line-clamp-3 mb-8 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Link href={`/journal/${post.slug}`}>
                    <button className="flex items-center gap-3 text-accent hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold">
                      Lire la suite <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.article>
            ))}

            {posts?.length === 0 && (
              <div className="col-span-full py-20 text-center glass rounded-[3rem] border-dashed border-white/10">
                <p className="text-white/20 font-mono text-sm tracking-widest uppercase">Nos premières histoires arrivent bientôt...</p>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-32 py-16 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.6em]">Alliance Travel DZ • Excellence in Travel © 2024</p>
      </footer>
    </main>
  );
}
