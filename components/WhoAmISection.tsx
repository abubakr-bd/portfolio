'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Compass, Sparkles, MapPin } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface WhoAmISectionProps {
  settings: SiteSettings;
}

export default function WhoAmISection({ settings }: WhoAmISectionProps) {
  return (
    <section id="about" className="py-24 border-b border-[#E5E0D6] bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">01 // IDENTITY</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              SO, WHO IS ABU BAKR?
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#7A7870] tracking-wider hidden sm:block">
            BANGLADESH → DHAKA → BUILDING THE FUTURE
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Massive Editorial Statement */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display leading-[1.05] text-[#121210]">
              I don't really like <br />
              <span className="italic font-normal text-[#E63B2E]">staying inside</span> <br />
              one box.
            </h2>

            <div className="p-6 bg-[#F2EFE9] border border-[#E0DCD3] space-y-3">
              <div className="text-[11px] font-mono-code uppercase tracking-widest text-[#7A7870]">
                CORE PHILOSOPHY
              </div>
              <p className="text-sm font-light text-[#2A2926] leading-relaxed">
                "Code makes it functional. Design makes it desirable. Video makes it memorable. 
                Entrepreneurship makes it sustainable. When you connect all four, you create leverage."
              </p>
              <div className="pt-2 text-xs font-mono-code text-[#E63B2E] font-bold">
                — ABU BAKR
              </div>
            </div>

            {/* Scrapbook polaroid card of early journey */}
            <div className="paper-card p-3 max-w-xs rotate-[-1deg] hidden sm:block">
              <div className="relative aspect-4/3 overflow-hidden bg-[#E5E0D6]">
                <Image
                  src="/images/story-learning.jpg"
                  alt="Studying Python & Machine Learning from scratch"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-[11px] font-mono-code text-[#5A5852] flex items-center justify-between">
                <span>Self-directed learning in Dhaka</span>
                <span className="text-[#8A8880]">2023</span>
              </p>
            </div>
          </div>

          {/* Right Column: Personal Storytelling & Timeline Marker */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-[#3A3833] text-lg font-light leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-[#121210] first-letter:mr-2 first-letter:float-left">
                I'm from Dhaka, Bangladesh. I'm obsessed with building things. Sometimes it's a website. 
                Sometimes it's a high-retention video. Sometimes it's a brand identity, and sometimes it's 
                a full-fledged digital business.
              </p>
              <p>
                Most people are told to pick one specialty and stick to it forever. But the internet doesn't 
                work that way anymore. The greatest leverage belongs to hybrid thinkers: builders who can 
                visualize the brand, write the code, direct the narrative, and close the client.
              </p>
              <p>
                From launching <strong>Motionly Media</strong> and teaching over 100+ students in <strong>Motionly Academy</strong>, 
                to co-founding <strong>EquiSaaS BD</strong> and designing packaging for <strong>Varnox Parfumerie</strong>, 
                my mission is simple: <em>turn raw ambition into world-class digital realities.</em>
              </p>
            </div>

            {/* Visual Milestones Cards (Scrapbook style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="paper-card p-4 space-y-3">
                <div className="relative aspect-4/3 overflow-hidden bg-[#EFECE4]">
                  <Image
                    src="/images/story-school.jpg"
                    alt="Abu Bakr - School Uniform Days"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-2 left-2 stamp-tag bg-[#121210] text-[#F9F8F5] text-[10px]">
                    THE BEGINNING
                  </div>
                </div>
                <h4 className="font-bold text-sm text-[#121210]">Rooted in Dhaka</h4>
                <p className="text-xs text-[#5A5852] leading-relaxed">
                  Began learning graphic design, video editing and code after school hours on a modest desktop setup.
                </p>
              </div>

              <div className="paper-card p-4 space-y-3">
                <div className="relative aspect-4/3 overflow-hidden bg-[#EFECE4]">
                  <Image
                    src="/images/award-winners.jpg"
                    alt="Stage recognition at Media Carnival"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 stamp-tag bg-[#E63B2E] text-[#F9F8F5] text-[10px]">
                    EXECUTION
                  </div>
                </div>
                <h4 className="font-bold text-sm text-[#121210]">Leading Teams & Events</h4>
                <p className="text-xs text-[#5A5852] leading-relaxed">
                  Leading visual direction for large youth festivals, winning awards, and scaling creative media ventures.
                </p>
              </div>
            </div>

            {/* Location & Coordinates Stamp */}
            <div className="pt-4 flex items-center justify-between border-t border-[#E5E0D6] text-xs font-mono-code text-[#7A7870]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E63B2E]" />
                Based in Dhaka, Bangladesh
              </span>
              <a
                href="/about"
                className="inline-flex items-center gap-1 text-[#121210] font-bold hover:text-[#E63B2E] transition-colors"
              >
                <span>Read Full Autobiography</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
