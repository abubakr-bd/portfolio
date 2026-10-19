'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react';
import { JournalArticle } from '@/lib/types';

interface JournalSectionProps {
  articles: JournalArticle[];
}

export default function JournalSection({ articles }: JournalSectionProps) {
  return (
    <section id="writing" className="py-24 border-b border-[#E5E0D6] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">12 // ESSAYS</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              THINGS I'VE BEEN THINKING ABOUT
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#7A7870] tracking-wider">
            FOUNDER ESSAYS & EDITORIAL REFLECTIONS
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <article
              key={art.id}
              className="paper-card bg-white border border-[#E5E0D6] hover:border-[#121210] flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#181816]">
                  <Image
                    src={art.coverImage}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="stamp-tag bg-[#121210]/90 text-[#F9F8F5] border-white/20 text-[10px]">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono-code text-[#7A7870]">
                    <span>{art.publishedDate}</span>
                    <span>{art.readingTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-medium text-[#121210] group-hover:text-[#E63B2E] transition-colors leading-snug">
                    <a href={`/journal/${art.slug}`}>{art.title}</a>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A5852] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-6 pt-0 border-t border-[#E5E0D6] flex items-center justify-between mt-4">
                <a
                  href={`/journal/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-[#121210] hover:text-[#E63B2E] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <span className="text-[10px] font-mono-code text-[#8A8880]">
                  BY {art.author.toUpperCase()}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* View All Journal Link */}
        <div className="mt-16 text-center">
          <a
            href="/journal"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#121210] hover:bg-[#121210] hover:text-[#F9F8F5] text-xs font-mono-code tracking-widest uppercase transition-colors"
          >
            <span>VIEW ALL JOURNAL WRITINGS</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
