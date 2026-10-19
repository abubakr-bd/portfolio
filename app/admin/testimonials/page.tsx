'use client';

import React, { useState, useEffect } from 'react';
import { Testimonial } from '@/lib/types';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/testimonials');
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
      id: `test-${Date.now()}`,
      quote: '',
      name: '',
      company: '',
      role: '',
      avatar: '/images/story-school.jpg',
      featured: true,
      rating: 5
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
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
      await fetch('/api/testimonials', {
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
            CMS // REPUTATION & PROOF
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Client Testimonials
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Endorsements from clients, co-founders, and partners.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors cursor-pointer font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {editing && (
        <div className="bg-white p-6 border border-[#121210] paper-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
            <h3 className="font-bold text-sm font-mono-code text-[#121210]">EDIT TESTIMONIAL</h3>
            <button onClick={() => setEditing(null)} className="cursor-pointer">
              <X className="w-5 h-5 text-[#7A7870]" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase font-bold">Client Quote *</label>
              <textarea
                rows={3}
                required
                value={editing.quote}
                onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Client Name *</label>
                <input
                  type="text"
                  required
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Company *</label>
                <input
                  type="text"
                  required
                  value={editing.company}
                  onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Role / Title *</label>
                <input
                  type="text"
                  required
                  value={editing.role}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>
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
              <p className="text-sm font-medium text-[#121210] italic">"{item.quote}"</p>
              <p className="text-xs font-mono-code text-[#7A7870]">
                {item.name} — {item.role}, {item.company}
              </p>
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
