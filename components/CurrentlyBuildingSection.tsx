'use client';

import React from 'react';
import { ArrowUpRight, Flame, Layers, Loader2, Sparkles } from 'lucide-react';
import { CurrentlyBuilding } from '@/lib/types';

interface CurrentlyBuildingProps {
  items: CurrentlyBuilding[];
}

export default function CurrentlyBuildingSection({ items }: CurrentlyBuildingProps) {
  const getStatusBadge = (status: CurrentlyBuilding['status']) => {
    switch (status) {
      case 'BUILDING':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'EXPERIMENT':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'COMING SOON':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  return (
    <section className="py-24 border-b border-[#E5E0D6] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">05 // LIVE LAB</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              CURRENTLY BUILDING
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#4A4842]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ACTIVELY SHIPPING FROM DHAKA</span>
          </div>
        </div>

        {/* Introduction Narrative */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#121210]">
            The journey is happening <span className="italic font-normal text-[#E63B2E]">right now</span>.
          </h2>
          <p className="mt-3 text-sm text-[#5A5852] leading-relaxed">
            I don't believe in static portfolios that look frozen in 2023. At 18, my ideas, ventures, 
            and code repos are constantly evolving. Here is what is active on my desk this week:
          </p>
        </div>

        {/* Live Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="paper-card p-6 sm:p-8 bg-white border border-[#E5E0D6] hover:border-[#121210] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs text-[#8A8880]">
                    LAB ITEM 0{idx + 1}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[11px] font-mono-code font-bold uppercase border ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    ● {item.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#121210]">
                  {item.project}
                </h3>

                <p className="text-sm text-[#4A4842] leading-relaxed">
                  {item.whatItIs}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E5E0D6]">
                <div className="flex items-center justify-between text-xs font-mono-code text-[#7A7870]">
                  <span>ROLE: {item.role}</span>
                  {item.progress && <span>PROGRESS: {item.progress}%</span>}
                </div>

                {item.progress && (
                  <div className="w-full bg-[#EFECE4] h-1.5 overflow-hidden">
                    <div
                      className="bg-[#121210] h-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#F5F2EB] text-[10px] font-mono-code text-[#5A5852]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
