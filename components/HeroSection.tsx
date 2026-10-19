'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Compass, Sparkles, MapPin } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface HeroSectionProps {
  settings: SiteSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#E5E0D6] paper-texture">
      {/* Editorial Grid Guides (Subtle) */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-4">
        <div className="hidden lg:block border-r border-[#E5E0D6]/40 h-full col-span-4" />
        <div className="hidden lg:block border-r border-[#E5E0D6]/40 h-full col-span-4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Bar / Issue Marker */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E5E0D6]/70 text-xs font-mono-code text-[#7A7870]">
          <div className="flex items-center gap-3">
            <span className="stamp-tag">VOL. 2026 // ISSUE 01</span>
            <span className="hidden sm:inline-block text-[#B0ADA4]">/</span>
            <span className="hidden sm:inline-block tracking-widest text-[#4A4842]">
              PERSONAL MONOGRAPH & ARCHIVE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#4A4842]">
              <MapPin className="w-3.5 h-3.5 text-[#E63B2E]" />
              {settings.location} [{settings.coordinates}]
            </span>
          </div>
        </div>

        {/* Main Hero Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#E63B2E] inline-block" />
                <span className="text-xs font-mono-code font-bold tracking-widest text-[#E63B2E] uppercase">
                  {settings.heroTagline || "HEY, I'M ABU BAKR."}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[82px] font-display font-medium leading-[0.98] text-[#121210] tracking-tight">
                I BUILD THINGS <br />
                <span className="italic font-normal text-[#E63B2E]">THAT TURN IDEAS</span> <br />
                INTO SOMETHING REAL.
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-[#4A4842] max-w-2xl font-light leading-relaxed">
              {settings.heroSubtitle}
            </p>

            {/* CTAs & Hand-drawn annotation */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#121210] hover:bg-[#E63B2E] text-[#F9F8F5] text-xs font-mono-code tracking-wider uppercase transition-colors"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#121210] hover:border-[#E63B2E] hover:text-[#E63B2E] text-[#121210] text-xs font-mono-code tracking-wider uppercase transition-colors"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="hidden sm:flex items-center gap-2 text-xs font-handwritten text-[#E63B2E] text-lg rotate-[-2deg] pl-2">
                <span>✦ built with curiosity</span>
              </div>
            </div>

            {/* Micro Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#E5E0D6] text-left">
              <div>
                <span className="block text-[10px] font-mono-code uppercase text-[#8A8880] tracking-wider">
                  ROLE
                </span>
                <span className="text-xs font-bold text-[#121210] mt-0.5 block">
                  Designer & Founder
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono-code uppercase text-[#8A8880] tracking-wider">
                  ORIGIN
                </span>
                <span className="text-xs font-bold text-[#121210] mt-0.5 block">
                  Dhaka, BD
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono-code uppercase text-[#8A8880] tracking-wider">
                  ACTIVE VENTURE
                </span>
                <span className="text-xs font-bold text-[#121210] mt-0.5 block">
                  Motionly & EquiSaaS
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono-code uppercase text-[#8A8880] tracking-wider">
                  DISCIPLINES
                </span>
                <span className="text-xs font-bold text-[#121210] mt-0.5 block">
                  Web • Video • Brand
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Portrait Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Layer 1: Background Offset Paper Card */}
              <div className="absolute inset-0 bg-[#EFECE4] border border-[#DDD7CD] translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4" />

              {/* Layer 2: Main Image Frame */}
              <div className="relative bg-[#FFFFFF] p-3 sm:p-4 border border-[#121210] shadow-sm">
                <div className="relative aspect-3/4 overflow-hidden bg-[#181816]">
                  <Image
                    src={settings.profileImage || "/images/portrait-editorial.png"}
                    alt="Abu Bakr — Young Bangladeshi Builder, Designer & Entrepreneur"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-top filter contrast-[1.03]"
                  />

                  {/* Dark subtle gradient bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#121210]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Tag inside photo */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="stamp-tag bg-[#121210]/80 text-[#F9F8F5] border-white/20 text-[10px]">
                      DHAKA // ARCHIVE 2026
                    </span>
                  </div>
                </div>

                {/* Caption / Annotation underneath frame */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono-code text-[#7A7870]">
                  <span>FIG. 01 — ABU BAKR</span>
                  <span className="text-[#121210] font-bold">23.8103° N, 90.4125° E</span>
                </div>
              </div>

              {/* Layer 3: Floating Scrapbook Annotation Sticky */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-[#FAF7F0] border border-[#121210] p-3 shadow-lg max-w-[210px] transform -rotate-3 hidden sm:block">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#8A8880] block mb-1">
                  CURRENT PASSION
                </span>
                <p className="text-xs font-handwritten text-[#121210] text-lg leading-tight">
                  Turning raw scripts and ideas into full digital empires.
                </p>
              </div>

              {/* Layer 4: Verification Stamp */}
              <div className="absolute -top-4 -right-4 bg-[#E63B2E] text-[#F9F8F5] px-3 py-1 font-mono-code text-[11px] font-bold tracking-widest uppercase border border-[#121210] shadow-md rotate-6">
                BUILDER ✦ BD
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
