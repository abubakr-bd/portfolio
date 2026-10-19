import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperienceSection from '@/components/ExperienceSection';
import ContactCTASection from '@/components/ContactCTASection';
import { getExperiences, getSettings } from '@/lib/db';
import { Download, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Experience & Credentials — Abu Bakr',
  description: 'The complete career, venture leadership, and creative chronology of Abu Bakr — Founder of Motionly Media, Co-Founder of EquiSaaS BD.'
};

export default function ExperiencePage() {
  const settings = getSettings();
  const experiences = getExperiences();

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F5]">
      <Navbar availableForWork={settings.availableForWork} />

      <main className="flex-grow">
        {/* Header */}
        <section className="py-20 border-b border-[#E5E0D6] paper-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 max-w-3xl">
              <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                VENTURES & POSITIONS // 2023–2026
              </span>
              <h1 className="text-5xl sm:text-7xl font-display font-medium text-[#121210] leading-none">
                WHERE I'VE BEEN
              </h1>
              <p className="text-lg sm:text-xl text-[#4A4842] font-light leading-relaxed">
                A non-traditional CV of someone who chose to build real businesses and direct creative 
                movements instead of collecting generic certificates.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <ExperienceSection items={experiences} />

        <ContactCTASection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
