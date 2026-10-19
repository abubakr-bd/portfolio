'use client';

import React, { useState, useEffect } from 'react';
import { CurrentlyBuilding } from '@/lib/types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminCurrentlyBuildingPage() {
  const [items, setItems] = useState<CurrentlyBuilding[]>([]);
  const [editing, setEditing] = useState<CurrentlyBuilding | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/currently-building');
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
      id: `cb-${Date.now()}`,
      project: '',
      whatItIs: '',
      role: 'Founder',
      status: 'BUILDING',
      progress: 50,
      tags: ['SaaS'],
      order: items.length + 1
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this live building project?')) return;
    try {
      await fetch(`/api/currently-building?id=${id}`, { method: 'DELETE' });
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
      await fetch('/api/currently-building', {
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
            CMS // LIVE EXPERIMENTAL LAB
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Currently Building
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Display live in-progress ventures, status badges, and progress percentages.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors cursor-pointer font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Add Live Project</span>
        </button>
      </div>

      {editing && (
        <div className="bg-white p-6 border border-[#121210] paper-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
            <h3 className="font-bold text-sm font-mono-code text-[#121210]">EDIT LAB ITEM</h3>
            <button onClick={() => setEditing(null)} className="cursor-pointer">
              <X className="w-5 h-5 text-[#7A7870]" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Project Name *</label>
                <input
                  type="text"
                  required
                  value={editing.project}
                  onChange={(e) => setEditing({ ...editing, project: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Status Badge</label>
                <select
                  value={editing.status}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                >
                  <option value="BUILDING">BUILDING</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="EXPERIMENT">EXPERIMENT</option>
                  <option value="COMING SOON">COMING SOON</option>
                  <option value="PAUSED">PAUSED</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Progress (0-100%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editing.progress || 0}
                  onChange={(e) => setEditing({ ...editing, progress: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase font-bold">What It Is (Description)</label>
              <textarea
                rows={2}
                value={editing.whatItIs}
                onChange={(e) => setEditing({ ...editing, whatItIs: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase font-bold">My Role</label>
              <input
                type="text"
                value={editing.role}
                onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
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
                Save
              </button>
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
                <span className="font-bold text-base text-[#121210]">{item.project}</span>
                <span className="px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase bg-[#F2EFE9] border border-[#DDD8CE]">
                  {item.status}
                </span>
                {item.progress && (
                  <span className="text-xs font-mono-code text-[#7A7870]">
                    ({item.progress}%)
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5A5852] line-clamp-1">{item.whatItIs}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setEditing({ ...item })}
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
