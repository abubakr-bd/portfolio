'use client';

import React from 'react';
import { ArrowUpRight, Calendar, Briefcase, Award, CheckCircle } from 'lucide-react';
import { Experience } from '@/lib/types';

interface ExperienceSectionProps {
  items: Experience[];
}

export default function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 border-b border-[#E5E0D6] bg-[#F9F8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">06 // TRAJECTORY</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              THE JOURNEY SO FAR
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#7A7870] tracking-wider">
            CHRONOLOGICAL VENTURES & ROLES
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-[#121210]/20 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-16">
          {items.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              {/* Bullet Node on Timeline Line */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-3.5 h-3.5 bg-[#F9F8F5] border-2 border-[#121210] group-hover:bg-[#E63B2E] group-hover:border-[#E63B2E] transition-colors" />

              <div className="paper-card p-6 sm:p-8 bg-white border border-[#E5E0D6] group-hover:border-[#121210] transition-all space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D6] pb-4">
                  <div className="space-y-1">
                    <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#121210]">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-mono-code text-[#E63B2E] font-bold">
                      @ {exp.company}
                    </div>
                  </div>

                  {exp.current && (
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono-code font-bold uppercase">
                      ● PRESENT ROLE
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#4A4842] leading-relaxed font-light">
                  {exp.description}
                </p>

                {/* Key Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#8A8880] block">
                      KEY ACHIEVEMENTS & MILESTONES
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#3A3832]">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#E63B2E] font-bold mt-0.5">✦</span>
                          <span className="leading-relaxed">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills/Stack Used */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-[#F5F2EB] text-[11px] font-mono-code text-[#5A5852]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View Full Experience Page CTA */}
        <div className="mt-16 text-center">
          <a
            href="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#121210] hover:bg-[#121210] hover:text-[#F9F8F5] text-xs font-mono-code tracking-wider uppercase transition-colors"
          >
            <span>VIEW COMPLETE RESUME & CREDENTIALS</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
