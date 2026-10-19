'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Copy, Check, Image as ImageIcon, Video, Trash2 } from 'lucide-react';

interface MediaFile {
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/upload');
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        await fetchMedia();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D6] paper-card">
        <div>
          <span className="text-xs font-mono-code text-[#E63B2E] font-bold uppercase">
            CMS // ASSET ASYLUM
          </span>
          <h1 className="text-3xl font-display font-medium text-[#121210]">
            Media Library
          </h1>
          <p className="text-xs font-mono-code text-[#7A7870] mt-1">
            Upload images, banners, mockups, and video clips (JPG, PNG, WEBP, SVG, MP4).
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121210] hover:bg-[#E63B2E] text-white text-xs font-mono-code tracking-wider uppercase transition-colors cursor-pointer font-bold">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
          <input
            type="file"
            accept="image/*,video/mp4"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E5E0D6] paper-card overflow-hidden group space-y-2 flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 bg-[#121210] overflow-hidden flex items-center justify-center">
              {file.type === 'video' ? (
                <div className="text-neutral-400 flex flex-col items-center gap-1">
                  <Video className="w-8 h-8" />
                  <span className="text-[10px] font-mono-code">MP4 Video</span>
                </div>
              ) : (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            <div className="p-3 space-y-2">
              <p className="text-xs font-bold text-[#121210] truncate" title={file.name}>
                {file.name}
              </p>

              <div className="flex items-center justify-between text-[10px] font-mono-code text-[#7A7870]">
                <span>{(file.size / 1024).toFixed(0)} KB</span>
                <span className="uppercase">{file.type}</span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(file.url)}
                className="w-full py-1.5 bg-[#FAF8F5] hover:bg-[#121210] hover:text-white border border-[#DDD8CE] text-[11px] font-mono-code flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedUrl === file.url ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
