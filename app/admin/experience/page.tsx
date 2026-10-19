'use client';

import React, { useState, useEffect } from 'react';
import { Experience } from '@/lib/types';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/experience');
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleNew = () => {
    setEditing({
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      period: '2026',
      current: true,
      description: '',
      achievements: ['Delivered key milestone'],
      skills: ['Design', 'Leadership'],
      order: items.length + 1
    });
    setIsNew(true);
  };

  const handleEdit = (item: Experience) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this timeline item?')) return;
    try {
      await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
      setItems(items.filter((i) => i.id !== id));
      if (editing?.id === id) setEditing(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    try {
      await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      });
      await fetchItems();
      setEditing(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D6] paper-card">
        <div>
          <span className="text-xs font-mono-code text-[#E63B2E] font-bold uppercase">
            CMS // CAREER TRAJECTORY
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Experience & Ventures
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Manage your timeline milestones, leadership roles, and achievements.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors cursor-pointer font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {editing && (
        <div className="bg-white p-6 border border-[#121210] paper-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
            <h3 className="font-bold text-sm font-mono-code text-[#121210]">
              {isNew ? 'NEW POSITION' : 'EDIT POSITION'}
            </h3>
            <button onClick={() => setEditing(null)} className="cursor-pointer">
              <X className="w-5 h-5 text-[#7A7870]" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Company / Project *</label>
                <input
                  type="text"
                  required
                  value={editing.company}
                  onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Position / Title *</label>
                <input
                  type="text"
                  required
                  value={editing.role}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Period (e.g. 2025 — Present)</label>
                <input
                  type="text"
                  value={editing.period}
                  onChange={(e) => setEditing({ ...editing, period: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase font-bold">Role Description</label>
              <textarea
                rows={2}
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase font-bold">Achievements (one per line)</label>
              <textarea
                rows={3}
                value={editing.achievements.join('\n')}
                onChange={(e) => setEditing({ ...editing, achievements: e.target.value.split('\n').filter(Boolean) })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase font-bold">Skills Used (comma-separated)</label>
              <input
                type="text"
                value={editing.skills.join(', ')}
                onChange={(e) => setEditing({ ...editing, skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs font-mono-code cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.current}
                  onChange={(e) => setEditing({ ...editing, current: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Currently Active Role</span>
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 border border-[#121210] text-xs font-mono-code cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code font-bold uppercase cursor-pointer"
                >
                  Save Position
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-white border border-[#E5E0D6] paper-card divide-y divide-[#E5E0D6]">
        {items.map((item) => (
          <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#121210]">{item.role}</span>
                <span className="text-xs font-mono-code text-[#E63B2E]">@ {item.company}</span>
                <span className="stamp-tag text-[9px]">{item.period}</span>
              </div>
              <p className="text-xs text-[#5A5852] line-clamp-1">{item.description}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-[#FAF8F5] border border-[#DDD8CE] text-xs font-mono-code hover:bg-[#121210] hover:text-white cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
