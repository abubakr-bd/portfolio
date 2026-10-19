'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@/lib/types';
import { Save, Check, Globe, Shield, Sparkles } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((e) => console.error(e));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setStatus('Saving...');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Failed to update');
      setStatus('Settings saved successfully ✓');
      setTimeout(() => setStatus(''), 2500);
    } catch (e) {
      setStatus('Error updating settings');
    }
  };

  if (!settings) {
    return <div className="p-8 text-xs font-mono-code">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D6] paper-card">
        <div>
          <span className="text-xs font-mono-code text-[#E63B2E] font-bold uppercase">
            CMS // GLOBAL CONFIGURATION
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Site Settings & SEO
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Global identity, contact channels, founder statistics, and default meta tags.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors cursor-pointer font-bold"
        >
          <Save className="w-4 h-4" />
          <span>{status || 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Identity */}
        <div className="bg-white p-6 sm:p-8 border border-[#E5E0D6] paper-card space-y-4">
          <h3 className="font-bold text-base text-[#121210] border-b border-[#E5E0D6] pb-2">
            01 // Core Founder Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase">Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase">Professional Title</label>
              <input
                type="text"
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase">Location / City</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase">Hero Tagline</label>
              <input
                type="text"
                value={settings.heroTagline}
                onChange={(e) => setSettings({ ...settings, heroTagline: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase">Profile Image Path</label>
              <input
                type="text"
                value={settings.profileImage}
                onChange={(e) => setSettings({ ...settings, profileImage: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono-code font-bold uppercase">Hero Subtitle</label>
            <textarea
              rows={2}
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
            />
          </div>
        </div>

        {/* Founder Statistics */}
        <div className="bg-white p-6 sm:p-8 border border-[#E5E0D6] paper-card space-y-4">
          <h3 className="font-bold text-base text-[#121210] border-b border-[#E5E0D6] pb-2">
            02 // Statistics & Proof Numbers
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono-code font-bold uppercase">Projects</label>
              <input
                type="number"
                value={settings.stats.projectsCompleted}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, projectsCompleted: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono-code font-bold uppercase">Clients</label>
              <input
                type="number"
                value={settings.stats.clientsWorldwide}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, clientsWorldwide: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono-code font-bold uppercase">Years Building</label>
              <input
                type="number"
                value={settings.stats.yearsBuilding}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, yearsBuilding: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono-code font-bold uppercase">Products</label>
              <input
                type="number"
                value={settings.stats.productsLaunched}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, productsLaunched: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono-code font-bold uppercase">Reach Count</label>
              <input
                type="text"
                value={settings.stats.reachCount}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, reachCount: e.target.value }
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="bg-white p-6 sm:p-8 border border-[#E5E0D6] paper-card space-y-4">
          <h3 className="font-bold text-base text-[#121210] border-b border-[#E5E0D6] pb-2">
            03 // Direct Channels & Socials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase">Primary Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase">Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase">WhatsApp</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase">LinkedIn URL</label>
              <input
                type="text"
                value={settings.socialLinks.linkedin || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase">GitHub URL</label>
              <input
                type="text"
                value={settings.socialLinks.github || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, github: e.target.value }
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase">Instagram URL</label>
              <input
                type="text"
                value={settings.socialLinks.instagram || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="bg-white p-6 sm:p-8 border border-[#E5E0D6] paper-card space-y-4">
          <h3 className="font-bold text-base text-[#121210] border-b border-[#E5E0D6] pb-2">
            04 // Default SEO & Meta Tags
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-mono-code font-bold uppercase">Default SEO Title</label>
            <input
              type="text"
              value={settings.defaultSeoTitle}
              onChange={(e) => setSettings({ ...settings, defaultSeoTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono-code font-bold uppercase">Default SEO Description</label>
            <textarea
              rows={2}
              value={settings.defaultSeoDescription}
              onChange={(e) => setSettings({ ...settings, defaultSeoDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {status || 'Save Global Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
