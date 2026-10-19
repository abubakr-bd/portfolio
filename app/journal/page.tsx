import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JournalSection from '@/components/JournalSection';
import ContactCTASection from '@/components/ContactCTASection';
import { getArticles, getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Journal & Writing — Abu Bakr',
  description: 'Essays on entrepreneurship, high-retention video editing, web architecture, and youth startup ecosystems in Bangladesh by Abu Bakr.'
};

export default function JournalPage() {
  const settings = getSettings();
  const articles = getArticles(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F5]">
      <Navbar availableForWork={settings.availableForWork} />

      <main className="flex-grow">
        {/* Header */}
        <section className="py-20 border-b border-[#E5E0D6] paper-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 max-w-3xl">
              <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                DISPATCHES & ESSAYS
              </span>
              <h1 className="text-5xl sm:text-7xl font-display font-medium text-[#121210] leading-none">
                THINGS I'VE BEEN THINKING ABOUT
              </h1>
              <p className="text-lg sm:text-xl text-[#4A4842] font-light leading-relaxed">
                Reflections on modern media, the science of viewer attention, software craftsmanship, 
                and building ventures from Dhaka.
              </p>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <JournalSection articles={articles} />

        <ContactCTASection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
