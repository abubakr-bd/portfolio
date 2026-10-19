import React from 'react';
import {
  getProjects,
  getExperiences,
  getArticles,
  getTestimonials,
  getMessages,
  getSettings,
  getCurrentlyBuilding
} from '@/lib/db';
import {
  Briefcase,
  Layers,
  BookOpen,
  Quote,
  Mail,
  Flame,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminDashboardPage() {
  const projects = getProjects();
  const experiences = getExperiences();
  const articles = getArticles();
  const testimonials = getTestimonials();
  const messages = getMessages();
  const building = getCurrentlyBuilding();
  const settings = getSettings();

  const unreadMessages = messages.filter((m) => m.status === 'new').length;

  const stats = [
    { label: 'Total Projects', count: projects.length, href: '/admin/projects', icon: Briefcase },
    { label: 'Active Inquiries', count: unreadMessages, href: '/admin/messages', icon: Mail, highlight: unreadMessages > 0 },
    { label: 'Journal Articles', count: articles.length, href: '/admin/journal', icon: BookOpen },
    { label: 'Timeline Roles', count: experiences.length, href: '/admin/experience', icon: Layers },
    { label: 'Testimonials', count: testimonials.length, href: '/admin/testimonials', icon: Quote },
    { label: 'Currently Building', count: building.length, href: '/admin/currently-building', icon: Flame },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 border border-[#E5E0D6] paper-card">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#E63B2E] font-bold">
            <span>COMMAND CENTER // VERIFIED SESSION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#121210] mt-1">
            Welcome back, {settings.name}.
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Managing personal digital identity, active client inquiries, and publishing pipeline.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </a>
          <a
            href="/admin/journal"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#121210] hover:bg-[#121210] hover:text-white text-xs font-mono-code tracking-wider uppercase transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </a>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              className={`p-5 bg-white border paper-card hover:border-[#121210] transition-colors block ${
                item.highlight ? 'border-[#E63B2E]' : 'border-[#E5E0D6]'
              }`}
            >
              <div className="flex items-center justify-between text-[#7A7870]">
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-[#E63B2E]' : ''}`} />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </div>
              <div className="mt-3 text-3xl font-display font-medium text-[#121210]">
                {item.count}
              </div>
              <div className="text-[11px] font-mono-code text-[#5A5852] uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </a>
          );
        })}
      </div>

      {/* Recent Inquiries Section */}
      <div className="bg-white border border-[#E5E0D6] paper-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#121210]">
              Recent Client Inquiries
            </h2>
            <p className="text-xs font-mono-code text-[#7A7870] mt-0.5">
              Submissions from the public contact intake form
            </p>
          </div>
          <a
            href="/admin/messages"
            className="text-xs font-mono-code text-[#E63B2E] hover:underline font-bold"
          >
            View All ({messages.length}) →
          </a>
        </div>

        {messages.length === 0 ? (
          <p className="text-xs font-mono-code text-[#8A8880] py-6 text-center">
            No inquiries received yet.
          </p>
        ) : (
          <div className="divide-y divide-[#E5E0D6]">
            {messages.slice(0, 5).map((msg) => (
              <div key={msg.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#121210]">{msg.name}</span>
                    <span className="text-xs font-mono-code text-[#7A7870]">({msg.email})</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono-code uppercase font-bold ${
                        msg.status === 'new'
                          ? 'bg-amber-100 text-amber-900'
                          : msg.status === 'replied'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5852] line-clamp-1">
                    "{msg.message}"
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono-code text-[#7A7870] shrink-0">
                  <span>SCOPE: {msg.projectType}</span>
                  <a
                    href="/admin/messages"
                    className="text-[#121210] font-bold hover:text-[#E63B2E]"
                  >
                    Open →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projects Preview */}
        <div className="bg-white border border-[#E5E0D6] paper-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
            <h3 className="font-bold text-base text-[#121210]">Featured Projects</h3>
            <a href="/admin/projects" className="text-xs font-mono-code text-[#E63B2E]">Manage →</a>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#121210]">{p.title}</span>
                  <span className="text-[#8A8880] block text-[11px] font-mono-code">{p.category} • {p.year}</span>
                </div>
                <span className="stamp-tag text-[10px]">
                  {p.published ? 'PUBLISHED' : 'DRAFT'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Lab Overview */}
        <div className="bg-white border border-[#E5E0D6] paper-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
            <h3 className="font-bold text-base text-[#121210]">Currently Building Items</h3>
            <a href="/admin/currently-building" className="text-xs font-mono-code text-[#E63B2E]">Manage →</a>
          </div>
          <div className="space-y-3">
            {building.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#121210]">{b.project}</span>
                  <span className="text-[#8A8880] block text-[11px] font-mono-code">{b.role}</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase bg-[#F2EFE9] border border-[#E2DDD3]">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
