'use client';

import React, { useState, useEffect } from 'react';
import { SkillCategory } from '@/lib/types';
import { Plus, Trash2, Save, Wrench } from 'lucide-react';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [saveStatus, setSaveStatus] = useState<string>('');

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSaveAll = async () => {
    setSaveStatus('Saving...');
    try {
      await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skills)
      });
      setSaveStatus('Saved successfully ✓');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (e) {
      setSaveStatus('Error saving skills');
    }
  };

  const addSkillToCategory = (catIdx: number) => {
    const next = [...skills];
    next[catIdx].skills.push({ name: 'New Skill', level: 'Advanced', note: '' });
    setSkills(next);
  };

  const removeSkillFromCategory = (catIdx: number, skillIdx: number) => {
    const next = [...skills];
    next[catIdx].skills.splice(skillIdx, 1);
    setSkills(next);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D6] paper-card">
        <div>
          <span className="text-xs font-mono-code text-[#E63B2E] font-bold uppercase">
            CMS // TECHNICAL ARSENAL
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Toolbox & Skills Index
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Configure your technical weapons across Web, Video, Design, and Business.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors cursor-pointer font-bold"
        >
          <Save className="w-4 h-4" />
          <span>{saveStatus || 'Save All Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((cat, catIdx) => (
          <div key={cat.id} className="bg-white p-6 border border-[#E5E0D6] paper-card space-y-4">
            <div className="border-b border-[#E5E0D6] pb-3 flex items-center justify-between">
              <div>
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => {
                    const next = [...skills];
                    next[catIdx].category = e.target.value;
                    setSkills(next);
                  }}
                  className="font-bold text-base text-[#121210] border-b border-transparent hover:border-[#121210] focus:border-[#121210] focus:outline-none"
                />
                <input
                  type="text"
                  value={cat.description}
                  onChange={(e) => {
                    const next = [...skills];
                    next[catIdx].description = e.target.value;
                    setSkills(next);
                  }}
                  className="text-xs text-[#7A7870] font-mono-code block w-full mt-1 border-b border-transparent hover:border-[#DDD8CE] focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => addSkillToCategory(catIdx)}
                className="px-2.5 py-1 bg-[#FAF8F5] border border-[#DDD8CE] text-xs font-mono-code hover:bg-[#121210] hover:text-white cursor-pointer"
              >
                + Tool
              </button>
            </div>

            <div className="space-y-2">
              {cat.skills.map((sk, sIdx) => (
                <div
                  key={sIdx}
                  className="p-2.5 bg-[#FAF8F5] border border-[#EAE6DE] flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={sk.name}
                      onChange={(e) => {
                        const next = [...skills];
                        next[catIdx].skills[sIdx].name = e.target.value;
                        setSkills(next);
                      }}
                      className="font-bold text-[#121210] bg-transparent focus:outline-none"
                    />
                    <input
                      type="text"
                      value={sk.note || ''}
                      placeholder="Note / detail"
                      onChange={(e) => {
                        const next = [...skills];
                        next[catIdx].skills[sIdx].note = e.target.value;
                        setSkills(next);
                      }}
                      className="text-[#7A7870] font-mono-code text-[11px] bg-transparent focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSkillFromCategory(catIdx, sIdx)}
                    className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
