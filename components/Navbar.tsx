'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  availableForWork?: boolean;
}

export default function Navbar({ availableForWork = true }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'ABOUT', href: '/#about' },
    { label: 'WORK', href: '/work' },
    { label: 'EXPERIENCE', href: '/experience' },
    { label: 'VISION', href: '/#vision' },
    { label: 'WRITING', href: '/journal' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F9F8F5]/95 backdrop-blur-md border-b border-[#E5E0D6] py-3.5 shadow-xs'
            : 'bg-[#F9F8F5] border-b border-[#E5E0D6] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a
            href="/"
            className="group flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#E63B2E]"
            aria-label="Abu Bakr Home"
          >
            <div className="w-8 h-8 rounded-full bg-[#121210] text-[#F9F8F5] flex items-center justify-center font-bold text-xs tracking-wider transition-transform group-hover:scale-105">
              AB
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-[#121210] group-hover:text-[#E63B2E] transition-colors">
                ABU BAKR
              </span>
              <span className="hidden sm:block text-[10px] font-mono-code text-[#7A7870] uppercase tracking-widest">
                DHAKA • BUILDER
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider font-mono-code text-[#4A4842]">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-[#E63B2E] transition-colors relative py-1 focus:outline-none focus:ring-1 focus:ring-[#E63B2E]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Availability & CTA */}
          <div className="hidden sm:flex items-center gap-4">
            {availableForWork && (
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-[#F0EDE6] border border-[#E2DDD3] rounded-full text-[11px] font-mono-code text-[#4A4842]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Q4 Projects</span>
              </div>
            )}
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#121210] hover:bg-[#E63B2E] text-[#F9F8F5] text-xs font-mono-code tracking-wider uppercase transition-colors rounded-none font-medium focus:outline-none focus:ring-2 focus:ring-[#E63B2E]"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#121210] hover:text-[#E63B2E] focus:outline-none focus:ring-2 focus:ring-[#E63B2E]"
            aria-label={isOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#F9F8F5] pt-24 px-6 flex flex-col justify-between pb-12 lg:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col space-y-6">
            <div className="text-[11px] font-mono-code uppercase tracking-widest text-[#8A8880] pb-2 border-b border-[#E5E0D6]">
              Navigation Index
            </div>
            {navLinks.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-2xl font-display italic text-[#121210] hover:text-[#E63B2E] transition-colors py-2 border-b border-[#E5E0D6]/60"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono-code font-normal text-[#8A8880]">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-[#E5E0D6]">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#4A4842]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for selected projects in Dhaka & globally</span>
            </div>
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#121210] text-[#F9F8F5] font-mono-code text-xs uppercase tracking-wider hover:bg-[#E63B2E] transition-colors"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
