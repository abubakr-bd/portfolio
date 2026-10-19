'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { Project } from '@/lib/types';

interface FeaturedCaseStudyProps {
  project?: Project;
}

export default function FeaturedCaseStudy({ project }: FeaturedCaseStudyProps) {
  if (!project) return null;

  return (
    <section className="py-24 border-b border-[#E5E0D6] bg-[#121210] text-[#F9F8F5] relative overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 font-display text-[220px] leading-none whitespace-nowrap text-white">
        SPOTLIGHT
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">04 // SPOTLIGHT</span>
            <span className="text-white/30">/</span>
            <span className="font-mono-code text-xs text-white/70 uppercase tracking-wider">
              FEATURED CASE STUDY
            </span>
          </div>
          <div className="stamp-tag bg-white/10 text-white border-white/20 text-xs">
            DEEP ARCHITECTURAL DIVE
          </div>
        </div>

        {/* Big Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-16/10 overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl group">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-code text-white/80">
                <span>PROJECT: {project.title}</span>
                <span className="stamp-tag bg-[#E63B2E] text-white border-none">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails row */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {project.gallery.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-16/9 overflow-hidden border border-white/15 bg-neutral-900"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} snapshot ${i + 1}`}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Editorial Case Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono-code text-[#E63B2E] uppercase tracking-widest block font-bold">
                FLAGSHIP VENTURE
              </span>
              <h3 className="text-4xl sm:text-5xl font-display font-medium text-white leading-tight">
                {project.title}
              </h3>
            </div>

            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              "{project.shortDescription}"
            </p>

            {/* Challenge & Solution Teasers */}
            <div className="space-y-4 pt-2 border-t border-white/10 text-xs font-mono-code">
              <div>
                <span className="text-[#E63B2E] uppercase font-bold block mb-1">
                  01 // THE CHALLENGE
                </span>
                <p className="text-neutral-400 font-sans leading-relaxed line-clamp-2">
                  {project.problem}
                </p>
              </div>

              <div>
                <span className="text-emerald-400 uppercase font-bold block mb-1">
                  02 // THE SOLUTION & OUTCOME
                </span>
                <p className="text-neutral-400 font-sans leading-relaxed line-clamp-2">
                  {project.outcome}
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E63B2E] hover:bg-[#C92F23] text-white text-xs font-mono-code tracking-wider uppercase transition-colors"
              >
                <span>READ IN-DEPTH CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="text-xs font-mono-code text-neutral-400">
                YEAR: {project.year}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
