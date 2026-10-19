'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  BookOpen,
  Quote,
  Wrench,
  Mail,
  Settings,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Compass,
  Flame,
  ShieldAlert
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // If on login page, render children directly without admin shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    // Check auth status
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        if (!data.authenticated) {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center font-mono-code text-xs text-[#5A5852]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#E63B2E] animate-ping" />
          <span>VERIFYING ADMIN CREDENTIALS...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects & Case Studies', href: '/admin/projects', icon: Briefcase },
    { label: 'Experience Timeline', href: '/admin/experience', icon: Layers },
    { label: 'Currently Building', href: '/admin/currently-building', icon: Flame },
    { label: 'Journal Articles', href: '/admin/journal', icon: BookOpen },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
    { label: 'Toolbox / Skills', href: '/admin/skills', icon: Wrench },
    { label: 'Inquiries / Messages', href: '/admin/messages', icon: Mail },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'Site Settings & SEO', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col md:flex-row text-[#121210]">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#121210] text-[#F9F8F5] p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#E63B2E] flex items-center justify-center text-xs font-bold">
            AB
          </div>
          <span className="font-mono-code text-xs font-bold tracking-wider">
            ABU BAKR CMS
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-white hover:text-[#E63B2E]"
          aria-label="Toggle admin navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop / Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 h-screen z-40 bg-[#121210] text-[#F9F8F5] w-64 flex flex-col justify-between shrink-0 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Brand header */}
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E63B2E] inline-block" />
              <h2 className="font-bold text-sm tracking-wider uppercase font-mono-code text-white">
                ABU BAKR CMS
              </h2>
            </div>
            <p className="text-[10px] font-mono-code text-neutral-400 mt-1">
              PORTFOLIO CONTROL CENTER
            </p>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono-code transition-colors ${
                    isActive
                      ? 'bg-[#E63B2E] text-white font-bold'
                      : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-white/10 space-y-3 bg-[#181816]">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between text-xs font-mono-code text-neutral-300 hover:text-white transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono-code transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-[#E63B2E]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Work Area */}
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8 md:p-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
