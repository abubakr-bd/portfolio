'use client';

import React from 'react';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { Testimonial } from '@/lib/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 border-b border-[#E5E0D6] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">10 // SOCIAL PROOF</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              WHAT PEOPLE SAY
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#7A7870] tracking-wider">
            CLIENT & PARTNER TESTIMONIALS
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className="paper-card p-6 sm:p-8 bg-white border border-[#E5E0D6] hover:border-[#121210] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#E63B2E]">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E63B2E]" />
                    ))}
                  </div>
                  <span className="font-mono-code text-xs text-[#8A8880]">0{idx + 1} //</span>
                </div>

                <p className="text-sm sm:text-base text-[#2A2926] leading-relaxed font-light italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E0D6] flex items-center gap-3">
                {item.avatar && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#EFECE4] border border-[#DDD7CD] shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-[#121210]">{item.name}</h4>
                  <p className="text-xs font-mono-code text-[#7A7870]">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
