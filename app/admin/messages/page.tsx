'use client';

import React, { useState, useEffect } from 'react';
import { Message } from '@/lib/types';
import { Mail, Trash2, CheckCircle2, Clock, Filter, ExternalLink } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, status } : m))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this inquiry?')) return;
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter((m) => m.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = filter === 'all'
    ? messages
    : messages.filter((m) => m.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D6] paper-card">
        <div>
          <span className="text-xs font-mono-code text-[#E63B2E] font-bold uppercase">
            CMS // CLIENT INBOX
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Inquiries & Leads
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Incoming briefs, inquiries, and collaboration proposals from the website.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(['all', 'new', 'read', 'replied'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer ${
                filter === status
                  ? 'bg-[#121210] text-white font-bold'
                  : 'bg-[#FAF8F5] text-[#5A5852] hover:bg-[#EFECE4] border border-[#DDD8CE]'
              }`}
            >
              {status} ({status === 'all' ? messages.length : messages.filter((m) => m.status === status).length})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#E5E0D6] paper-card text-xs font-mono-code text-[#7A7870]">
            No inquiries matching the selected filter.
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white p-6 border paper-card space-y-4 transition-all ${
                msg.status === 'new' ? 'border-[#E63B2E]' : 'border-[#E5E0D6]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D6] pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base text-[#121210]">{msg.name}</span>
                  {msg.company && (
                    <span className="text-xs font-mono-code text-[#5A5852]">
                      @ {msg.company}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono-code uppercase font-bold ${
                      msg.status === 'new'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : msg.status === 'replied'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    ● {msg.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono-code text-[#7A7870]">
                  <span>DATE: {new Date(msg.createdAt).toLocaleDateString()}</span>
                  <span>BUDGET: {msg.budget || 'Flexible'}</span>
                  <span>TYPE: {msg.projectType}</span>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#EAE6DE] text-sm text-[#2A2926] leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="text-[#8A8880]">CONTACT:</span>
                  <a
                    href={`mailto:${msg.email}?subject=Re: Your Project Inquiry with Abu Bakr`}
                    className="font-bold text-[#121210] hover:text-[#E63B2E] flex items-center gap-1"
                  >
                    <span>{msg.email}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={msg.status}
                    onChange={(e) => handleUpdateStatus(msg.id, e.target.value as any)}
                    className="px-2.5 py-1 text-xs font-mono-code border border-[#DDD8CE] bg-white cursor-pointer"
                  >
                    <option value="new">Mark New</option>
                    <option value="read">Mark Read</option>
                    <option value="replied">Mark Replied</option>
                  </select>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
