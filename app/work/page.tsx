import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SelectedWorkSection from '@/components/SelectedWorkSection';
import ContactCTASection from '@/components/ContactCTASection';
import { getProjects, getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Selected Work & Projects — Abu Bakr',
  description: 'Explore the full creative and engineering portfolio of Abu Bakr across Web, Video, Branding, Graphic Design, and Digital Ventures.'
};

export default function WorkPage() {
  const settings = getSettings();
  const projects = getProjects(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F5]">
      <Navbar availableForWork={settings.availableForWork} />

      <main className="flex-grow">
        {/* Header */}
        <section className="py-20 border-b border-[#E5E0D6] paper-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 max-w-3xl">
              <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                COMPLETE ARCHIVE // 2023–2026
              </span>
              <h1 className="text-5xl sm:text-7xl font-display font-medium text-[#121210] leading-none">
                THINGS I'VE BUILT
              </h1>
              <p className="text-lg sm:text-xl text-[#4A4842] font-light leading-relaxed">
                A curated index of digital ventures, brand identities, high-retention video architectures, 
                and web software designed and engineered by Abu Bakr.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <SelectedWorkSection projects={projects} />

        <ContactCTASection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
