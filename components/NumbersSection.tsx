'use client';

import React from 'react';
import { SiteSettings } from '@/lib/types';

interface NumbersSectionProps {
  stats: SiteSettings['stats'];
}

export default function NumbersSection({ stats }: NumbersSectionProps) {
  const metrics = [
    { label: 'PROJECTS DELIVERED', value: `${stats.projectsCompleted}+`, note: 'Across Web, Video & Brand' },
    { label: 'ACTIVE CLIENTS', value: `${stats.clientsWorldwide}+`, note: 'In 5+ Countries' },
    { label: 'YEARS OF BUILDING', value: `${stats.yearsBuilding}+`, note: 'Disciplined Self-Taught Craft' },
    { label: 'VENTURES LAUNCHED', value: `${stats.productsLaunched}`, note: 'Motionly, EquiSaaS, Varnox' },
    { label: 'AUDIENCE IMPRESSIONS', value: stats.reachCount, note: 'Organic Digital Views' },
  ];

  return (
    <section className="py-20 border-b border-[#E5E0D6] bg-[#121210] text-[#F9F8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">11 // METRICS</span>
            <span className="text-white/30">/</span>
            <span className="font-mono-code text-xs text-white/70 uppercase tracking-wider">
              NUMBERS & PROOF
            </span>
          </div>
          <span className="text-xs font-mono-code text-neutral-400">
            TRANSPARENT FOUNDER DATA
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {metrics.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
                {item.value}
              </div>
              <div className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#E63B2E]">
                {item.label}
              </div>
              <p className="text-[11px] font-mono-code text-neutral-400">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
