'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Send, CheckCircle2, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import confetti from 'canvas-confetti';

interface ContactCTASectionProps {
  settings: SiteSettings;
}

export default function ContactCTASection({ settings }: ContactCTASectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Website',
    budget: '$1,000 — $2,500',
    message: '',
    honeypot: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus('success');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#E63B2E', '#121210', '#E5E0D6']
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'Website',
        budget: '$1,000 — $2,500',
        message: '',
        honeypot: ''
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please email directly.');
    }
  };

  return (
    <section id="contact" className="py-24 border-b border-[#E5E0D6] bg-[#F2EFE9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-16 border-b border-[#DDD8CE]">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs font-bold text-[#E63B2E]">13 // INITIATION</span>
            <span className="text-[#A5A29A]">/</span>
            <span className="font-mono-code text-xs text-[#5A5852] uppercase tracking-wider">
              LET'S BUILD SOMETHING
            </span>
          </div>
          <div className="text-xs font-mono-code text-[#7A7870] tracking-wider">
            DIRECT INQUIRIES & PARTNERSHIPS
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Outreach & Direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#121210] leading-[1.05]">
                Have an idea, project <br />
                or collaboration? <br />
                <span className="italic font-normal text-[#E63B2E]">Tell me about it.</span>
              </h2>

              <p className="text-base text-[#4A4842] font-light leading-relaxed">
                Whether you need a world-class web platform, high-retention video pipeline, or 
                a complete brand architecture — I'm open for selected high-impact projects.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-4">
              <a
                href={`mailto:${settings.email}`}
                className="paper-card p-4 bg-white border border-[#DDD8CE] flex items-center justify-between hover:border-[#121210] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E5E0D6] flex items-center justify-center text-[#E63B2E]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono-code uppercase text-[#8A8880]">
                      DIRECT EMAIL
                    </span>
                    <span className="text-xs font-bold text-[#121210]">
                      {settings.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8A8880]" />
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="paper-card p-4 bg-white border border-[#DDD8CE] flex items-center justify-between hover:border-[#121210] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E5E0D6] flex items-center justify-center text-emerald-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono-code uppercase text-[#8A8880]">
                      WHATSAPP / PHONE
                    </span>
                    <span className="text-xs font-bold text-[#121210]">
                      {settings.phone}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8A8880]" />
              </a>
            </div>

            {/* Response Time Guarantee */}
            <div className="p-4 bg-[#FAF8F5] border border-[#DDD8CE] text-xs font-mono-code text-[#5A5852] space-y-1">
              <span className="font-bold text-[#121210]">✦ RESPONSE COMMITMENT</span>
              <p>I typically reply to detailed project briefs within 24–48 hours from Dhaka.</p>
            </div>
          </div>

          {/* Right Column: Interactive Proposal & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="paper-card p-8 sm:p-10 bg-white border border-[#121210]">
              <div className="border-b border-[#E5E0D6] pb-4 mb-6 flex items-center justify-between">
                <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                  PROJECT INTAKE FORM
                </span>
                <span className="text-xs font-mono-code text-[#7A7870]">
                  STEP 01 OF 01
                </span>
              </div>

              {status === 'success' ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-[#121210]">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-[#5A5852] max-w-md mx-auto">
                    Thank you for reaching out. Your proposal has been delivered to Abu Bakr. 
                    I'll review your scope and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2.5 bg-[#121210] text-[#F9F8F5] text-xs font-mono-code tracking-wider uppercase cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field (hidden from genuine users) */}
                  <input
                    type="text"
                    name="website_trap"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-code font-bold uppercase text-[#121210] block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanzim Ahmed"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD8CE] text-sm text-[#121210] focus:border-[#121210] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-code font-bold uppercase text-[#121210] block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. tanzim@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD8CE] text-sm text-[#121210] focus:border-[#121210] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-code font-bold uppercase text-[#121210] block">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. EquiSaaS / Self"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD8CE] text-sm text-[#121210] focus:border-[#121210] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-code font-bold uppercase text-[#121210] block">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD8CE] text-sm text-[#121210] focus:border-[#121210] focus:outline-none"
                      >
                        <option value="Website">Website / Web App</option>
                        <option value="Video">Video Editing & Motion</option>
                        <option value="Branding">Brand Identity & System</option>
                        <option value="Design">Graphic & UI/UX Design</option>
                        <option value="Ventures">Startup / Consultation</option>
                        <option value="Other">Other Creative Scope</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code font-bold uppercase text-[#121210] block">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD8CE] text-sm text-[#121210] focus:border-[#121210] focus:outline-none"
                    >
                      <option value="<$1,000">Under $1,000</option>
                      <option value="$1,000 — $2,500">$1,000 — $2,500</option>
                      <option value="$2,500 — $5,000">$2,500 — $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                      <option value="Flexible / Equity">Flexible / Venture Collaboration</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code font-bold uppercase text-[#121210] block">
                      Tell Me About the Project *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your goals, timeline, and what success looks like..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD8CE] text-sm text-[#121210] focus:border-[#121210] focus:outline-none"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs font-mono-code text-[#E63B2E]">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-[#121210] hover:bg-[#E63B2E] text-[#F9F8F5] text-xs font-mono-code tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer font-bold disabled:opacity-50"
                  >
                    <span>{status === 'submitting' ? 'SENDING INQUIRY...' : 'SUBMIT PROJECT BRIEF →'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
