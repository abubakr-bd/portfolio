'use client';

import React from 'react';
import { ArrowUpRight, Flame, Heart, Compass, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface VisionSectionProps {
  settings: SiteSettings;
}

export default function VisionSection({ settings }: VisionSectionProps) {
  return (
    <section id="vision" className="py-28 border-b border-[#E5E0D6] bg-[#121210] text-[#F9F8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">09 // MANIFESTO</span>
            <span className="text-white/30">/</span>
            <span className="font-mono-code text-xs text-white/70 uppercase tracking-wider">
              THE VISION
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#E63B2E] tracking-wider uppercase font-bold">
            ✦ LONG-TERM HORIZON
          </div>
        </div>

        {/* Oversized Typography Statement */}
        <div className="space-y-8 max-w-5xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-display font-medium leading-[0.98] tracking-tight">
            I DON'T JUST WANT TO MAKE <br />
            <span className="italic font-normal text-[#E63B2E]">THINGS LOOK GOOD</span>. <br />
            I WANT TO BUILD THINGS <br />
            THAT ACTUALLY MATTER.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/15">
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs font-mono-code text-[#E63B2E] tracking-widest uppercase block">
                FOUNDER'S CREED
              </span>
              <p className="text-xs font-mono-code text-neutral-400">
                Architecting digital self-determination for South Asian youth.
              </p>
            </div>

            <div className="md:col-span-8 space-y-6 text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              <p>
                My vision is to bridge the gap between design, engineering, and enterprise. 
                I want to demonstrate that a single disciplined builder equipped with modern software 
                and uncompromising taste can outbuild entire bloated agencies.
              </p>
              <p>
                Through <strong>Motionly Academy</strong> and my upcoming ventures, I am committed to 
                training hundreds of young creators in Bangladesh to think like founders rather than 
                gig-workers. By teaching high-leverage video retention, web architecture, and commercial 
                positioning, we build sustainable wealth and global influence right from Dhaka.
              </p>

              <div className="pt-4 flex flex-wrap gap-6 text-xs font-mono-code text-neutral-400">
                <span className="flex items-center gap-2">
                  <span className="text-[#E63B2E]">✦</span> CREATE OPPORTUNITIES
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#E63B2E]">✦</span> MASTER THE CRAFT
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#E63B2E]">✦</span> SHIP WITHOUT EXCUSES
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
