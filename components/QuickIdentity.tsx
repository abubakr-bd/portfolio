'use client';

import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export default function QuickIdentity() {
  const items = [
    'DESIGNER',
    'BUILDER',
    'ENTREPRENEUR',
    'DHAKA, BANGLADESH',
    'MOTIONLY MEDIA',
    'EQUISAAS BD',
    'HIGH-RETENTION VIDEO',
    'NEXT.JS & REACT 19',
    'BRAND ARCHITECTURE',
    'SCENTS THAT SPEAK',
  ];

  return (
    <div className="border-b border-[#E5E0D6] bg-[#121210] text-[#F9F8F5] py-3 overflow-hidden select-none">
      <div className="animate-ticker flex items-center gap-8 whitespace-nowrap text-xs font-mono-code tracking-widest font-bold uppercase">
        {items.concat(items).map((item, idx) => (
          <span key={idx} className="flex items-center gap-6">
            <span className="hover:text-[#E63B2E] transition-colors">{item}</span>
            <span className="text-[#E63B2E] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
