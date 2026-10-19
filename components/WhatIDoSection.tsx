'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Code, Video, Palette, Sparkles, Box, TrendingUp, Layers } from 'lucide-react';

export default function WhatIDoSection() {
  const [activeItem, setActiveItem] = useState(0);

  const disciplines = [
    {
      number: '01',
      title: 'WEB ARCHITECTURE',
      tagline: 'Websites, landing pages & digital experiences',
      description:
        'Modern, lightning-fast web applications built with Next.js, React 19, TypeScript, and Tailwind CSS. Clean component systems, flawless SEO architecture, and editorial-level typography.',
      icon: Code,
      tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      deliverables: ['Custom Web Portals', 'High-Converting Landing Pages', 'Interactive SaaS Frontends']
    },
    {
      number: '02',
      title: 'RETENTION VIDEO',
      tagline: 'Video editing, motion design & commercial content',
      description:
        'Conversion-focused video editing designed to capture attention in the first 1.8 seconds. Dynamic pacing, kinetic typography, atmospheric sound design, and micro-pattern interrupts.',
      icon: Video,
      tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut Pro'],
      deliverables: ['Viral Short-Form Reels', 'YouTube Long-Form Narratives', 'Commercial Brand Films']
    },
    {
      number: '03',
      title: 'VISUAL DESIGN',
      tagline: 'Brand identity, graphic systems & editorial layouts',
      description:
        'Swiss-influenced typography mixed with expressive visual identity. Precision layout grids, high-contrast poster designs, print merchandise, and 3D product staging.',
      icon: Palette,
      tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', '3D Staging'],
      deliverables: ['Complete Design Systems', 'Editorial Print Collateral', 'Digital Marketing Assets']
    },
    {
      number: '04',
      title: 'BRAND DIRECTION',
      tagline: 'Personal brands, business identity & creative direction',
      description:
        'Transforming companies and founders into unforgettable cultural entities. Narrative positioning, tone of voice, visual guidelines, and strategic commercial framing.',
      icon: Sparkles,
      tools: ['Brand Strategy', 'Visual Identity Systems', 'Style Guides'],
      deliverables: ['Founder Brand Positioning', 'Brand Identity Toolkits', 'Commercial Art Direction']
    },
    {
      number: '05',
      title: 'DIGITAL VENTURES',
      tagline: 'Digital products, startups & experimental systems',
      description:
        'Building software and creator ventures from scratch. From whiteboard concept and wireframe validation to full MVP deployment and user acquisition funnels.',
      icon: Box,
      tools: ['Product Design', 'Rapid Prototyping', 'Full-Stack Execution'],
      deliverables: ['SaaS Applications', 'Creator Academy Platforms', 'E-Commerce Portals']
    },
    {
      number: '06',
      title: 'GROWTH SYSTEMS',
      tagline: 'Content distribution, viral funnels & audience scaling',
      description:
        'Organic distribution frameworks that turn passive views into paying customers. Content calendars, hook libraries, audience psychology, and multi-channel lead funnels.',
      icon: TrendingUp,
      tools: ['Funnel Architecture', 'Retention Analytics', 'Community Growth'],
      deliverables: ['Organic Content Engines', 'Lead Generation Funnels', 'Cohort Communities']
    }
  ];

  return (
    <section id="services" className="py-24 border-b border-[#E5E0D6] bg-[#F9F8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">02 // CAPABILITIES</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              WHAT I DO
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#7A7870] tracking-wider">
            INDEX OF DISCIPLINES & SERVICES
          </div>
        </div>

        {/* Interactive Editorial Index Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered List Index */}
          <div className="lg:col-span-6 space-y-2">
            {disciplines.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeItem === idx;

              return (
                <div
                  key={item.number}
                  onMouseEnter={() => setActiveItem(idx)}
                  onClick={() => setActiveItem(idx)}
                  className={`cursor-pointer transition-all duration-300 p-5 sm:p-6 border ${
                    isActive
                      ? 'bg-[#121210] text-[#F9F8F5] border-[#121210] translate-x-2'
                      : 'bg-white hover:bg-[#F2EFE9] text-[#121210] border-[#E5E0D6]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className={`font-mono-code text-sm font-bold ${
                          isActive ? 'text-[#E63B2E]' : 'text-[#8A8880]'
                        }`}
                      >
                        {item.number}
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                          {item.title}
                        </h3>
                        <p
                          className={`text-xs mt-1 transition-colors ${
                            isActive ? 'text-[#C5C3BC]' : 'text-[#6A6860]'
                          }`}
                        >
                          {item.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'text-[#E63B2E] rotate-45' : 'text-[#A5A29A]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Preview Card of Active Discipline */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="paper-card p-8 sm:p-10 space-y-8 bg-white border border-[#121210] relative">
              <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-4">
                <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                  DISCIPLINE {disciplines[activeItem].number}
                </span>
                <span className="text-xs font-mono-code text-[#E63B2E] font-bold">
                  AVAILABLE FOR HIRE
                </span>
              </div>

              <div>
                <h4 className="text-3xl sm:text-4xl font-display font-medium text-[#121210]">
                  {disciplines[activeItem].title}
                </h4>
                <p className="mt-3 text-sm text-[#4A4842] leading-relaxed">
                  {disciplines[activeItem].description}
                </p>
              </div>

              {/* Tools & Stack */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#8A8880] block">
                  TECHNICAL STACK & ARSENAL
                </span>
                <div className="flex flex-wrap gap-2">
                  {disciplines[activeItem].tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-[#F5F2EB] border border-[#DDD7CD] text-xs font-mono-code text-[#121210]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#8A8880] block">
                  WHAT YOU GET
                </span>
                <ul className="space-y-2 text-xs font-mono-code text-[#3A3832]">
                  {disciplines[activeItem].deliverables.map((deliv, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#E63B2E]">✓</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5E0D6] flex items-center justify-between">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-[#F9F8F5] text-xs font-mono-code tracking-wider uppercase transition-colors"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <span className="text-xs font-mono-code text-[#7A7870]">
                  Dhaka & Remote Worldwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
