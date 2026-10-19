import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTASection from '@/components/ContactCTASection';
import { getSettings } from '@/lib/db';
import { MapPin, ArrowUpRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Me — Abu Bakr',
  description: 'The personal autobiography, origin story, and creative philosophy of Abu Bakr — Bangladeshi entrepreneur, designer, and builder.'
};

export default function AboutPage() {
  const settings = getSettings();

  const principles = [
    {
      title: 'Taste is Not an Accident',
      description: 'Great design is born from obsessive reduction. If an element doesn’t serve emotion or utility, it doesn’t belong on the canvas.'
    },
    {
      title: 'Code is Creative Material',
      description: 'Understanding software allows designers to dream in reality. Being able to code what you design removes the friction between vision and execution.'
    },
    {
      title: 'Attention is Hard-Earned',
      description: 'Nobody owes you their time. In video or product design, the first seconds dictate whether your message survives or gets dismissed.'
    },
    {
      title: 'Roots Give Grounding',
      description: 'Being built in Dhaka, Bangladesh provides an unshakeable sense of hunger. We build with grit, humility, and global ambition.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F5]">
      <Navbar availableForWork={settings.availableForWork} />

      <main className="flex-grow">
        {/* Editorial Page Header */}
        <section className="py-20 border-b border-[#E5E0D6] paper-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                  AUTOBIOGRAPHY // ARCHIVE
                </span>
                <span className="text-xs font-mono-code text-[#7A7870]">
                  DHAKA [23.8103° N, 90.4125° E]
                </span>
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-medium text-[#121210] leading-none">
                WHO IS ABU BAKR?
              </h1>
              <p className="text-xl sm:text-2xl text-[#4A4842] font-light leading-relaxed max-w-2xl">
                A young builder from Bangladesh working across design, technology, media, and entrepreneurship.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative & Story Split */}
        <section className="py-20 border-b border-[#E5E0D6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Story Cards & Images */}
              <div className="lg:col-span-5 space-y-6">
                <div className="paper-card p-4 bg-white border border-[#121210]">
                  <div className="relative aspect-4/5 overflow-hidden bg-[#181816]">
                    <Image
                      src={settings.profileImage}
                      alt="Abu Bakr in suit"
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-mono-code text-[#7A7870]">
                    <span>FIG. 01 — ABU BAKR</span>
                    <span className="font-bold text-[#121210]">AGE 18 // DHAKA</span>
                  </div>
                </div>

                <div className="paper-card p-4 bg-white border border-[#E5E0D6] space-y-3">
                  <div className="relative aspect-16/10 overflow-hidden bg-[#EFECE4]">
                    <Image
                      src="/images/story-childhood.jpg"
                      alt="Abu Bakr Childhood"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs font-mono-code text-[#5A5852]">
                    EARLY CURIOSITY // "I began taking apart computer software before I even spoke fluent English."
                  </p>
                </div>
              </div>

              {/* Right Column: In-Depth Personal Narrative */}
              <div className="lg:col-span-7 space-y-8 text-[#3A3833] text-lg font-light leading-relaxed">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#121210]">
                    The Boy Who Refused the Single Box
                  </h2>
                  <p>
                    I was born and raised in Dhaka, Bangladesh. In our culture, traditional expectations 
                    for young men are rigid: focus on standardized exams, secure a conventional desk job, 
                    and keep your head down.
                  </p>
                  <p>
                    By age 14, I realized that modern computers provided an unprecedented superpower: 
                    anyone with an internet connection could teach themselves the tools of global commerce. 
                    I opened Photoshop and spent nights dissecting Swiss typography, editorial magazines, 
                    and album cover layouts. Soon after, I realized static graphics weren’t enough — so I 
                    taught myself frame pacing in Premiere Pro and After Effects.
                  </p>
                  <p>
                    Then, when I wanted my creative work to live in interactive spaces, I learned to code. 
                    HTML, CSS, JavaScript, React, and Next.js became natural extensions of my sketchbook.
                  </p>
                </div>

                <div className="p-6 bg-[#F2EFE9] border-l-4 border-[#E63B2E] space-y-2">
                  <span className="text-xs font-mono-code text-[#E63B2E] font-bold uppercase tracking-wider">
                    MY CORE HYPOTHESIS
                  </span>
                  <p className="text-base text-[#121210] font-sans font-medium">
                    "When you remove the boundaries between designer, programmer, and storyteller, you build products with a soul."
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-medium text-[#121210]">
                    From Freelancer to Venture Architect
                  </h3>
                  <p>
                    Like many South Asian builders, I began by taking freelance design jobs. But the race to the bottom 
                    on generic marketplaces felt hollow. I wanted to build entities with identity, philosophy, and longevity.
                  </p>
                  <p>
                    That led to the creation of <strong>Motionly Media</strong>, where we engineered high-retention video 
                    frameworks for international creators, and <strong>Motionly Academy</strong>, where I’ve guided over 
                    a hundred young Bangladeshi creators in launching their own digital careers. It also inspired 
                    <strong>EquiSaaS BD</strong>, an enterprise branding and SaaS venture that earned stage recognition 
                    at Infinity AI BuildFest at BRAC University.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guiding Principles */}
        <section className="py-20 border-b border-[#E5E0D6] bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <span className="font-mono-code text-xs font-bold text-[#E63B2E] uppercase">
                CODE OF CONDUCT
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#121210] mt-1">
                Principles I Build By
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {principles.map((pr, idx) => (
                <div
                  key={idx}
                  className="paper-card p-8 bg-white border border-[#E5E0D6] space-y-3"
                >
                  <div className="text-xs font-mono-code text-[#E63B2E] font-bold">
                    PRINCIPLE 0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[#121210]">
                    {pr.title}
                  </h3>
                  <p className="text-sm text-[#5A5852] leading-relaxed">
                    {pr.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTASection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
