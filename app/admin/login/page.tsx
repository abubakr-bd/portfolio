'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('abubakr');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAccess = () => {
    setPassword('abubakr_creative_2026');
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center p-4">
      <div className="paper-card w-full max-w-md p-8 sm:p-10 bg-white border border-[#121210] shadow-xl space-y-6">
        <div className="space-y-2 border-b border-[#E5E0D6] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#E63B2E] inline-block" />
            <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#121210]">
              ABU BAKR CMS
            </span>
          </div>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Admin Verification
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870]">
            Sign in to manage projects, articles, credentials and site configuration.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-code font-bold uppercase text-[#121210] block">
              Admin Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD8CE] text-sm text-[#121210] focus:border-[#121210] focus:outline-none font-mono-code"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-code font-bold uppercase text-[#121210] block">
              Secret Passkey
            </label>
            <input
              type="password"
              required
              placeholder="Enter master passkey..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD8CE] text-sm text-[#121210] focus:border-[#121210] focus:outline-none font-mono-code"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-xs font-mono-code text-[#E63B2E]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#121210] hover:bg-[#E63B2E] text-[#F9F8F5] text-xs font-mono-code tracking-wider uppercase transition-colors flex items-center justify-center gap-2 font-bold cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'ENTER CMS CONTROL →'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-[#E5E0D6] space-y-3">
          <div className="p-3 bg-[#F9F8F5] border border-[#E5E0D6] text-xs font-mono-code text-[#5A5852] space-y-1">
            <div className="font-bold text-[#121210] flex items-center justify-between">
              <span>LOCAL PASSKEY HELPER</span>
              <button
                type="button"
                onClick={handleQuickDemoAccess}
                className="text-[#E63B2E] hover:underline cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <p className="text-[11px] text-[#7A7870]">
              Passkey: <code className="bg-[#EFECE4] px-1 py-0.5 text-[#121210]">abubakr_creative_2026</code>
            </p>
          </div>

          <div className="text-center">
            <a
              href="/"
              className="text-xs font-mono-code text-[#7A7870] hover:text-[#121210] transition-colors"
            >
              ← Back to Public Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
