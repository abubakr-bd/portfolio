'use client';

import React from 'react';
import { Sparkles, Terminal, Layers, Monitor, Wrench } from 'lucide-react';
import { SkillCategory } from '@/lib/types';

interface ToolboxSectionProps {
  categories: SkillCategory[];
}

export default function ToolboxSection({ categories }: ToolboxSectionProps) {
  return (
    <section className="py-24 border-b border-[#E5E0D6] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">07 // ARSENAL</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              MY TOOLBOX
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#7A7870] tracking-wider">
            EDITORIAL INDEX OF SOFTWARE & PRACTICES
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((group, idx) => (
            <div
              key={group.id}
              className="paper-card p-6 bg-white border border-[#E5E0D6] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
                  <span className="text-xs font-mono-code text-[#E63B2E] font-bold">
                    0{idx + 1} //
                  </span>
                  <span className="font-mono-code text-xs font-bold tracking-wider uppercase text-[#121210]">
                    {group.category}
                  </span>
                </div>

                <p className="text-xs text-[#6A6860] leading-relaxed">
                  {group.description}
                </p>

                {/* Skill List items */}
                <div className="space-y-2.5 pt-2">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 bg-[#FAF8F5] border border-[#EAE6DE] hover:border-[#121210] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#121210]">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono-code text-[#8A8880] uppercase">
                          {skill.level}
                        </span>
                      </div>
                      {skill.note && (
                        <p className="text-[11px] text-[#7A7870] mt-1 line-clamp-1">
                          {skill.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono-code text-[#8A8880] uppercase tracking-widest text-right">
                VERIFIED TOOLSET
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
