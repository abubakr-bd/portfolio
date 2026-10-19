'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { Project } from '@/lib/types';

interface SelectedWorkProps {
  projects: Project[];
}

export default function SelectedWorkSection({ projects }: SelectedWorkProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Business / Startup', 'Branding', 'Graphic Design', 'Website', 'Video'];

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="py-24 border-b border-[#E5E0D6] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-12 border-b border-[#E5E0D6] gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">03 // ARCHIVE</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              THINGS I'VE BUILT
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono-code tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#121210] text-[#F9F8F5]'
                    : 'bg-[#EFECE4] text-[#4A4842] hover:bg-[#E2DDD3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {filtered.map((project, idx) => {
            // First item is huge full-width feature card, second and third split 7/5 or 6/6
            const isHeroCard = idx === 0;
            const colSpan = isHeroCard
              ? 'md:col-span-12'
              : idx % 2 === 1
              ? 'md:col-span-7'
              : 'md:col-span-5';

            return (
              <div
                key={project.id}
                className={`${colSpan} group`}
              >
                <div className="paper-card overflow-hidden bg-white border border-[#E5E0D6] group-hover:border-[#121210] transition-all">
                  {/* Image Container with Hover Scale */}
                  <div className={`relative overflow-hidden bg-[#181816] ${isHeroCard ? 'aspect-16/9 sm:aspect-21/9 max-h-[500px]' : 'aspect-16/10'}`}>
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes={isHeroCard ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Category Stamp Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="stamp-tag bg-[#121210]/85 text-[#F9F8F5] border-white/20 backdrop-blur-xs">
                        {project.category}
                      </span>
                    </div>

                    {/* Year Stamp */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="stamp-tag bg-white/90 text-[#121210] border-black/10 backdrop-blur-xs">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-[#7A7870]">
                      <span>CLIENT: {project.client}</span>
                      <span className="text-[#E63B2E] font-medium">ROLE: {project.role}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#121210] group-hover:text-[#E63B2E] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#4A4842] leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 bg-[#F5F2EB] text-[11px] font-mono-code text-[#5A5852]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action link */}
                    <div className="pt-4 border-t border-[#E5E0D6] flex items-center justify-between">
                      <a
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold tracking-wider uppercase text-[#121210] hover:text-[#E63B2E] transition-colors"
                      >
                        <span>VIEW FULL CASE STUDY</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      <span className="text-[11px] font-mono-code text-[#8A8880]">
                        0{idx + 1} // 0{filtered.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Work CTA */}
        <div className="mt-16 text-center">
          <a
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#121210] hover:bg-[#E63B2E] text-[#F9F8F5] text-xs font-mono-code tracking-widest uppercase transition-colors"
          >
            <span>EXPLORE ENTIRE WORK ARCHIVE</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
