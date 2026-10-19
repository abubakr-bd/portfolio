'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight, Heart, MapPin } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121210] text-[#F9F8F5] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top: Massive Name Display */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/15">
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-medium tracking-tight text-white leading-none">
              ABU BAKR
            </h2>
            <p className="text-sm sm:text-base font-mono-code text-neutral-400 max-w-xl">
              Designer. Builder. Entrepreneur. <br />
              Based in Dhaka, Bangladesh. Building globally.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="self-start md:self-auto p-4 border border-white/20 hover:border-[#E63B2E] hover:text-[#E63B2E] text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Middle: Navigation & Direct Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs font-mono-code">
          {/* Col 1: Sitemap */}
          <div className="space-y-3">
            <span className="text-[11px] text-[#E63B2E] uppercase tracking-widest block font-bold">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="/#about" className="hover:text-white transition-colors">01 // About Me</a></li>
              <li><a href="/work" className="hover:text-white transition-colors">02 // Selected Work</a></li>
              <li><a href="/experience" className="hover:text-white transition-colors">03 // Experience</a></li>
              <li><a href="/#vision" className="hover:text-white transition-colors">04 // The Vision</a></li>
              <li><a href="/journal" className="hover:text-white transition-colors">05 // Journal & Essays</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">06 // Contact</a></li>
            </ul>
          </div>

          {/* Col 2: Social Networks */}
          <div className="space-y-3">
            <span className="text-[11px] text-[#E63B2E] uppercase tracking-widest block font-bold">
              NETWORK
            </span>
            <ul className="space-y-2 text-neutral-400">
              {settings.socialLinks.linkedin && (
                <li>
                  <a href={settings.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              )}
              {settings.socialLinks.github && (
                <li>
                  <a href={settings.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              )}
              {settings.socialLinks.instagram && (
                <li>
                  <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              )}
              {settings.socialLinks.behance && (
                <li>
                  <a href={settings.socialLinks.behance} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>Behance</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              )}
              {settings.socialLinks.youtube && (
                <li>
                  <a href={settings.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>YouTube</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              )}
              {settings.socialLinks.x && (
                <li>
                  <a href={settings.socialLinks.x} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>X (Twitter)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Coordinates & Contact */}
          <div className="space-y-3">
            <span className="text-[11px] text-[#E63B2E] uppercase tracking-widest block font-bold">
              HQ LOCATION
            </span>
            <div className="text-neutral-400 space-y-1.5 leading-relaxed">
              <p className="text-white font-bold">{settings.location}</p>
              <p>{settings.coordinates}</p>
              <p className="pt-2">Email: {settings.email}</p>
              <p>Phone: {settings.phone}</p>
            </div>
          </div>

          {/* Col 4: Monograph Info & Admin access */}
          <div className="space-y-3">
            <span className="text-[11px] text-[#E63B2E] uppercase tracking-widest block font-bold">
              SYS STATUS
            </span>
            <div className="text-neutral-400 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Crafted with Next.js 16, React 19, TypeScript & Tailwind CSS.
              </p>
              <div className="pt-3">
                <a
                  href="/admin"
                  className="inline-block px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] tracking-wider uppercase transition-colors"
                >
                  Admin CMS Panel →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-neutral-500">
          <div>
            © {currentYear} Abu Bakr. All rights reserved.
          </div>
          <div className="text-[#E63B2E] font-bold">
            Made with curiosity from Bangladesh.
          </div>
        </div>
      </div>
    </footer>
  );
}
