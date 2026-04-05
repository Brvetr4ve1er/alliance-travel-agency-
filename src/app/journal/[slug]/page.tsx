
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCollection } from '@/firebase';
import { BlogPost } from '@/lib/types';
import FloatingNav from '@/components/layout/FloatingNav';
import TopLogo from '@/components/layout/TopLogo';
import { Loader2, ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import WhatsAppFloatingCTA from '@/components/ui/WhatsAppFloatingCTA';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data: posts, loading } = useCollection<BlogPost>('blog_posts');
  
  // Find post by slug
  const post = posts?.find(p => p.slug === slug);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background text-white gap-6">
        <p className="font-mono text-xs uppercase tracking-widest">Article introuvable</p>
        <Link href="/journal">
          <button className="flex items-center gap-2 text-accent uppercase text-[10px] font-bold tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Retour au journal
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <TopLogo />
      <FloatingNav />
      <WhatsAppFloatingCTA />

      {/* Hero Header */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={post.coverImage || 'https://picsum.photos/seed/journal/1920/1080'}
          alt={post.title}
          fill
          className="object-cover"
          priority
          data-ai-hint="Journal story background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 text-accent font-mono text-[10px] tracking-[0.5em] uppercase">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-DZ') : 'Recent'}</span>
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
              </div>
              <h1 className="font-headline text-4xl md:text-7xl font-bold leading-tight tracking-tighter text-white">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass p-10 md:p-20 rounded-[3rem] shadow-3xl"
        >
          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-white/70 leading-[1.8] space-y-8 text-lg font-body">
              {post.content.split('\n').map((paragraph, i) => (
                paragraph.trim() && <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-20 pt-12 border-t border-white/5 flex flex-wrap gap-3">
              {post.tags.map((tag, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] text-white/40 uppercase tracking-widest font-mono">
                  <Tag className="w-3 h-3 text-accent" />
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Post Footer */}
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
            <Link href="/journal">
              <button className="flex items-center gap-3 text-white/40 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold">
                <ArrowLeft className="w-4 h-4 text-accent" /> Retour au Journal
              </button>
            </Link>
            
            <div className="flex items-center gap-6">
               <p className="text-[10px] text-white/20 uppercase tracking-widest">Partager cet article</p>
               <div className="flex gap-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border border-white/10 hover:border-accent flex items-center justify-center transition-colors cursor-pointer group">
                     <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-accent" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="mt-32 py-16 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.6em]">Alliance Travel DZ • Excellence in Travel © 2024</p>
      </footer>
    </main>
  );
}
