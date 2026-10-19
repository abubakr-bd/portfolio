'use client';

import React, { useState, useEffect } from 'react';
import { JournalArticle } from '@/lib/types';
import { Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';

export default function AdminJournalPage() {
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [editing, setEditing] = useState<JournalArticle | null>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/journal');
      const data = await res.json();
      setArticles(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleNew = () => {
    setEditing({
      id: `art-${Date.now()}`,
      slug: '',
      title: '',
      excerpt: '',
      content: '### New Heading\n\nWrite your thoughts here...',
      coverImage: '/images/story-learning.jpg',
      category: 'Entrepreneurship',
      tags: ['Mindset', 'Startup'],
      publishedDate: 'October 2026',
      author: 'Abu Bakr',
      readingTime: '4 min read',
      featured: false,
      published: true
    });
    setIsNew(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this essay?')) return;
    try {
      await fetch(`/api/journal/${id}`, { method: 'DELETE' });
      setArticles(articles.filter((a) => a.id !== id));
      if (editing?.id === id) setEditing(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    try {
      await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      });
      await fetchArticles();
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
            CMS // EDITORIAL ESSAYS
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Journal & Articles
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Publish thought-leadership essays on video editing, technology, and building ventures.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors cursor-pointer font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      {editing && (
        <div className="bg-white p-6 sm:p-8 border border-[#121210] paper-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
            <h3 className="font-bold text-sm font-mono-code text-[#121210]">
              {isNew ? 'NEW ESSAY' : 'EDIT ESSAY'}
            </h3>
            <button onClick={() => setEditing(null)} className="cursor-pointer">
              <X className="w-5 h-5 text-[#7A7870]" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Article Title *</label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Slug (URL) *</label>
                <input
                  type="text"
                  required
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Category</label>
                <input
                  type="text"
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Cover Image URL</label>
                <input
                  type="text"
                  value={editing.coverImage}
                  onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Published Date</label>
                <input
                  type="text"
                  value={editing.publishedDate}
                  onChange={(e) => setEditing({ ...editing, publishedDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-code uppercase font-bold">Reading Time</label>
                <input
                  type="text"
                  value={editing.readingTime}
                  onChange={(e) => setEditing({ ...editing, readingTime: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase font-bold">Excerpt / Summary</label>
              <textarea
                rows={2}
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-code uppercase font-bold">Article Markdown Content</label>
              <textarea
                rows={8}
                value={editing.content}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono-code border border-[#DDD8CE] bg-[#FAF8F5]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs font-mono-code cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Published on Live Site</span>
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
                  Save Article
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-white border border-[#E5E0D6] paper-card divide-y divide-[#E5E0D6]">
        {articles.map((art) => (
          <div key={art.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#121210]">{art.title}</span>
                <span className="stamp-tag text-[9px]">{art.category}</span>
                <span className="stamp-tag text-[9px]">
                  {art.published ? 'LIVE' : 'DRAFT'}
                </span>
              </div>
              <p className="text-xs text-[#7A7870] font-mono-code">
                /{art.slug} • {art.publishedDate} • {art.readingTime}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <a
                href={`/journal/${art.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-[#7A7870] hover:text-[#121210]"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setEditing({ ...art })}
                className="px-3 py-1 bg-[#FAF8F5] border border-[#DDD8CE] text-xs font-mono-code hover:bg-[#121210] hover:text-white cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(art.id)}
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
