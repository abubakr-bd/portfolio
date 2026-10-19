'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { Plus, Edit2, Trash2, Check, X, ArrowUpRight, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (p: Project) => {
    setEditingProject({ ...p });
    setIsNew(false);
    setSaveStatus('idle');
  };

  const handleNew = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      slug: '',
      title: '',
      category: 'Website',
      client: '',
      year: '2026',
      role: 'Founder & Designer',
      shortDescription: '',
      featured: false,
      published: true,
      problem: '',
      idea: '',
      process: '',
      result: '',
      personalContribution: '',
      outcome: '',
      thumbnail: '/images/motionly-hero.png',
      gallery: [],
      tags: ['Next.js', 'Branding'],
      order: projects.length + 1
    });
    setIsNew(true);
    setSaveStatus('idle');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter((p) => p.id !== id));
      if (editingProject?.id === id) setEditingProject(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaveStatus('saving');
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSaveStatus('saved');
      await fetchProjects();
      setTimeout(() => {
        setEditingProject(null);
      }, 700);
    } catch (e) {
      console.error(e);
      setSaveStatus('error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D6] paper-card">
        <div>
          <span className="text-xs font-mono-code text-[#E63B2E] font-bold uppercase">
            CMS REPOSITORY // CASE STUDIES
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Projects & Case Studies
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Manage public portfolio works and the 8-chapter case study system.
          </p>
        </div>

        <button
          onClick={handleNew}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors cursor-pointer font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Editor Modal / Inline Form if editing */}
      {editingProject && (
        <div className="bg-white p-6 sm:p-8 border border-[#121210] paper-card space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-4">
            <div>
              <span className="stamp-tag bg-[#121210] text-white text-[10px]">
                {isNew ? 'CREATE NEW CASE STUDY' : 'EDIT CASE STUDY'}
              </span>
              <h2 className="text-2xl font-display font-medium text-[#121210] mt-1">
                {editingProject.title || 'Untitled Project'}
              </h2>
            </div>
            <button
              onClick={() => setEditingProject(null)}
              className="p-2 text-[#7A7870] hover:text-[#121210] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">Slug (URL) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. motionly-agency"
                  value={editingProject.slug}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">Category</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                >
                  <option value="Website">Website</option>
                  <option value="Video">Video</option>
                  <option value="Motion">Motion</option>
                  <option value="Branding">Branding</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Business / Startup">Business / Startup</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">Client</label>
                <input
                  type="text"
                  value={editingProject.client}
                  onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">Year</label>
                <input
                  type="text"
                  value={editingProject.year}
                  onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">My Role</label>
                <input
                  type="text"
                  value={editingProject.role}
                  onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={editingProject.thumbnail}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">Short Summary</label>
              <textarea
                rows={2}
                value={editingProject.shortDescription}
                onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            {/* The 6 Narrative Case Study Fields */}
            <div className="space-y-4 pt-4 border-t border-[#E5E0D6]">
              <span className="text-xs font-mono-code font-bold uppercase text-[#E63B2E] block">
                CASE STUDY CHAPTERS (CMS POWERED)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">01 — The Problem</label>
                  <textarea
                    rows={3}
                    value={editingProject.problem}
                    onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">02 — The Creative Idea</label>
                  <textarea
                    rows={3}
                    value={editingProject.idea}
                    onChange={(e) => setEditingProject({ ...editingProject, idea: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">03 — The Execution Process</label>
                  <textarea
                    rows={3}
                    value={editingProject.process}
                    onChange={(e) => setEditingProject({ ...editingProject, process: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">04 — The Result</label>
                  <textarea
                    rows={3}
                    value={editingProject.result}
                    onChange={(e) => setEditingProject({ ...editingProject, result: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">05 — My Personal Contribution</label>
                  <textarea
                    rows={3}
                    value={editingProject.personalContribution}
                    onChange={(e) => setEditingProject({ ...editingProject, personalContribution: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-code font-bold uppercase text-[#121210]">06 — Measurable Outcome & Stats</label>
                  <textarea
                    rows={3}
                    value={editingProject.outcome}
                    onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                  />
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E5E0D6] text-xs font-mono-code">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProject.featured}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="font-bold">Featured Spotlight Project</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProject.published}
                  onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="font-bold">Published on Live Site</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E0D6]">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 border border-[#121210] text-xs font-mono-code uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveStatus === 'saving'}
                className="px-6 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code uppercase font-bold transition-colors cursor-pointer"
              >
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved ✓' : 'Save Case Study'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white border border-[#E5E0D6] paper-card overflow-hidden">
        <div className="p-4 border-b border-[#E5E0D6] flex items-center justify-between text-xs font-mono-code text-[#7A7870]">
          <span>TOTAL: {projects.length} PROJECTS</span>
          <span>CLICK ANY ITEM TO EDIT</span>
        </div>

        <div className="divide-y divide-[#E5E0D6]">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-[#121210] relative overflow-hidden shrink-0 border border-[#DDD8CE]">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#121210]">{proj.title}</h3>
                    {proj.featured && (
                      <span className="stamp-tag text-[9px] bg-amber-100 text-amber-900 border-amber-300">
                        FEATURED
                      </span>
                    )}
                    <span className="stamp-tag text-[9px]">
                      {proj.published ? 'LIVE' : 'DRAFT'}
                    </span>
                  </div>
                  <p className="text-xs font-mono-code text-[#7A7870] mt-0.5">
                    {proj.category} • Client: {proj.client} • {proj.year} • Slug: /{proj.slug}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href={`/work/${proj.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-[#7A7870] hover:text-[#121210]"
                  title="View live case study"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleEdit(proj)}
                  type="button"
                  className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#121210] hover:text-white border border-[#DDD8CE] text-xs font-mono-code transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  type="button"
                  className="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 cursor-pointer"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
