import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTASection from '@/components/ContactCTASection';
import { getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Contact & Inquiries — Abu Bakr',
  description: 'Initiate a new project, creative collaboration, or consultation with Abu Bakr in Dhaka, Bangladesh.'
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F5]">
      <Navbar availableForWork={settings.availableForWork} />

      <main className="flex-grow">
        {/* Header */}
        <section className="py-20 border-b border-[#E5E0D6] paper-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 max-w-3xl">
              <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                DIRECT TRANSMISSION
              </span>
              <h1 className="text-5xl sm:text-7xl font-display font-medium text-[#121210] leading-none">
                LET'S BUILD SOMETHING
              </h1>
              <p className="text-lg sm:text-xl text-[#4A4842] font-light leading-relaxed">
                Whether you need high-retention commercial video systems, Next.js web architecture, 
                or a comprehensive brand identity — send your brief directly to my desk in Dhaka.
              </p>
            </div>
          </div>
        </section>

        <ContactCTASection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
