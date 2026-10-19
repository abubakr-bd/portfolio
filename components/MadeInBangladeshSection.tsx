'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Globe, Compass, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface MadeInBangladeshSectionProps {
  settings: SiteSettings;
}

export default function MadeInBangladeshSection({ settings }: MadeInBangladeshSectionProps) {
  return (
    <section className="py-24 border-b border-[#E5E0D6] bg-[#F2EFE9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#DDD8CE]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">08 // ORIGIN</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              MADE IN BANGLADESH
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#7A7870] tracking-wider">
            DHAKA [23.8103° N, 90.4125° E]
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                DHAKA ROOTS ✦ GLOBAL HORIZONS
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#121210] leading-tight">
                Built in Bangladesh. <br />
                <span className="italic font-normal text-[#E63B2E]">Thinking globally.</span>
              </h2>
            </div>

            <p className="text-lg text-[#3A3833] font-light leading-relaxed">
              Growing up in the electric energy of Dhaka taught me resourcefulness before I even knew 
              what startups were. Here, you learn that constraints don't limit creativity — they amplify it.
            </p>

            <p className="text-sm text-[#5A5852] leading-relaxed">
              As a young Bangladeshi designer and tech entrepreneur, I reject the idea that emerging market 
              talent should only perform cheap outsourced labor. My aim is to build category-defining brands, 
              high-retention media architectures, and refined web experiences that stand toe-to-toe with 
              creative studios anywhere in New York, London, or Tokyo.
            </p>

            {/* Micro Metadata Strip */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DDD8CE] text-xs font-mono-code">
              <div>
                <span className="text-[#8A8880] block text-[10px] uppercase">CITY</span>
                <span className="font-bold text-[#121210]">Dhaka, BD</span>
              </div>
              <div>
                <span className="text-[#8A8880] block text-[10px] uppercase">CLIENT REACH</span>
                <span className="font-bold text-[#121210]">US, UK, EU, UAE, BD</span>
              </div>
              <div>
                <span className="text-[#8A8880] block text-[10px] uppercase">COMMUNITY</span>
                <span className="font-bold text-[#121210]">100+ Builders Mentored</span>
              </div>
              <div>
                <span className="text-[#8A8880] block text-[10px] uppercase">PERSPECTIVE</span>
                <span className="font-bold text-[#121210]">Zero Excuses, Pure Output</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame with Bangladesh Travel & Heritage Map */}
          <div className="lg:col-span-6 relative">
            <div className="paper-card p-4 sm:p-6 bg-white border border-[#121210] space-y-4">
              <div className="relative aspect-4/5 sm:aspect-square overflow-hidden bg-[#FBF9F5] border border-[#E5E0D6]">
                <Image
                  src="/images/bangladesh-map.png"
                  alt="My Bangladesh (আমার বাংলাদেশ) - Dhaka origin map"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono-code text-[#7A7870] pt-1">
                <span className="flex items-center gap-1.5 text-[#121210] font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#E63B2E]" />
                  DHAKA, NARAYANGANJ, MUNSHIGANJ & BEYOND
                </span>
                <span>ARCHIVE MAP 2026</span>
              </div>
            </div>

            {/* Handwritten note floating on corner */}
            <div className="absolute -bottom-5 -right-3 bg-[#FAF8F5] border border-[#121210] p-3 shadow-md max-w-[200px] hidden sm:block rotate-2">
              <p className="text-xs font-handwritten text-[#E63B2E] text-lg leading-tight">
                "Our environment shapes our hunger. Our work shapes our destiny."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
