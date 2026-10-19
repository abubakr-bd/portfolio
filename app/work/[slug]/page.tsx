import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTASection from '@/components/ContactCTASection';
import { getProjectBySlug, getProjects, getSettings } from '@/lib/db';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Share2, Sparkles } from 'lucide-react';

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.seoTitle || `${project.title} — Case Study by Abu Bakr`,
    description: project.seoDescription || project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.thumbnail]
    }
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const settings = getSettings();
  const allProjects = getProjects(true);

  if (!project) {
    notFound();
  }

  // Find next project for 08 — NEXT PROJECT navigation
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F5]">
      <Navbar availableForWork={settings.availableForWork} />

      <main className="flex-grow">
        {/* Breadcrumb & Navigation Back */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#7A7870]">
            <a href="/work" className="hover:text-[#E63B2E] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO WORK</span>
            </a>
            <span>/</span>
            <span className="text-[#121210] uppercase">{project.title}</span>
          </div>
        </div>

        {/* Case Study Header Monograph */}
        <section className="pt-10 pb-16 border-b border-[#E5E0D6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                  CASE STUDY
                </span>
                <span className="stamp-tag stamp-accent">
                  {project.category}
                </span>
                <span className="text-xs font-mono-code text-[#7A7870]">
                  YEAR: {project.year}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#121210] leading-tight">
                {project.title}
              </h1>

              <p className="text-lg sm:text-2xl text-[#4A4842] font-light leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 sm:p-8 bg-white border border-[#E5E0D6] text-xs font-mono-code">
              <div>
                <span className="text-[10px] uppercase text-[#8A8880] block mb-1">
                  CLIENT / ENTITY
                </span>
                <span className="font-bold text-[#121210] text-sm">
                  {project.client}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#8A8880] block mb-1">
                  YEAR COMPLETED
                </span>
                <span className="font-bold text-[#121210] text-sm">
                  {project.year}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#8A8880] block mb-1">
                  DISCIPLINE
                </span>
                <span className="font-bold text-[#121210] text-sm">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#8A8880] block mb-1">
                  MY ROLE
                </span>
                <span className="font-bold text-[#E63B2E] text-sm">
                  {project.role}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Featured Visual */}
        <section className="py-12 border-b border-[#E5E0D6] bg-[#121210]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden border border-white/20 shadow-2xl bg-neutral-900">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* The 8 Comprehensive Case Study Chapters */}
        <section className="py-20 border-b border-[#E5E0D6]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* 01 — THE PROBLEM */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold text-[#E63B2E]">CHAPTER 01 //</span>
                <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#121210]">
                  THE PROBLEM
                </h2>
              </div>
              <div className="p-6 sm:p-8 bg-white border border-[#E5E0D6] paper-card space-y-3">
                <p className="text-base sm:text-lg text-[#3A3832] font-light leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </div>

            {/* 02 — THE IDEA */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold text-[#E63B2E]">CHAPTER 02 //</span>
                <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#121210]">
                  THE CREATIVE IDEA & DIRECTION
                </h2>
              </div>
              <div className="p-6 sm:p-8 bg-white border border-[#E5E0D6] paper-card space-y-3">
                <p className="text-base sm:text-lg text-[#3A3832] font-light leading-relaxed">
                  {project.idea}
                </p>
              </div>
            </div>

            {/* 03 — THE PROCESS */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold text-[#E63B2E]">CHAPTER 03 //</span>
                <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#121210]">
                  THE EXECUTION PROCESS
                </h2>
              </div>
              <div className="p-6 sm:p-8 bg-white border border-[#E5E0D6] paper-card space-y-3">
                <p className="text-base sm:text-lg text-[#3A3832] font-light leading-relaxed">
                  {project.process}
                </p>
              </div>
            </div>

            {/* 04 — THE RESULT */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold text-[#E63B2E]">CHAPTER 04 //</span>
                <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#121210]">
                  THE RESULT & DELIVERABLES
                </h2>
              </div>
              <div className="p-6 sm:p-8 bg-white border border-[#E5E0D6] paper-card space-y-3">
                <p className="text-base sm:text-lg text-[#3A3832] font-light leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>

            {/* 05 — MY PERSONAL CONTRIBUTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold text-[#E63B2E]">CHAPTER 05 //</span>
                <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#121210]">
                  MY PERSONAL CONTRIBUTION
                </h2>
              </div>
              <div className="p-6 sm:p-8 bg-[#F2EFE9] border-l-4 border-[#121210] space-y-3">
                <div className="text-xs font-mono-code uppercase text-[#7A7870] font-bold">
                  DIRECT INDIVIDUAL WORK BY ABU BAKR
                </div>
                <p className="text-base sm:text-lg text-[#121210] leading-relaxed">
                  {project.personalContribution}
                </p>
              </div>
            </div>

            {/* 06 — MEASURABLE OUTCOME */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold text-emerald-600">CHAPTER 06 //</span>
                <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#121210]">
                  MEASURABLE OUTCOME & IMPACT
                </h2>
              </div>
              <div className="p-6 sm:p-8 bg-white border border-emerald-300 paper-card space-y-3">
                <p className="text-base sm:text-lg text-[#121210] font-medium leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* 07 — VISUAL GALLERY */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-3 border-b border-[#E5E0D6] pb-4">
                  <span className="text-xs font-mono-code font-bold text-[#E63B2E]">CHAPTER 07 //</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#121210]">
                    VISUAL GALLERY
                  </h2>
                </div>

                <div className="space-y-8">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="paper-card overflow-hidden bg-white border border-[#E5E0D6]">
                      <div className="relative aspect-16/10 overflow-hidden bg-[#181816]">
                        <Image
                          src={img}
                          alt={`${project.title} gallery plate ${i + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 80vw"
                          className="object-contain bg-neutral-900"
                        />
                      </div>
                      <div className="p-3 text-xs font-mono-code text-[#7A7870] flex items-center justify-between border-t border-[#E5E0D6]">
                        <span>PLATE 0{i + 1} — {project.title.toUpperCase()}</span>
                        <span>HIGH RESOLUTION ARCHIVE</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 08 — NEXT PROJECT NAVIGATION */}
            {nextProject && (
              <div className="pt-12 border-t-2 border-[#121210]">
                <div className="flex items-center justify-between text-xs font-mono-code text-[#7A7870] mb-4">
                  <span>CHAPTER 08 // NAVIGATION</span>
                  <span>CONTINUE READING ARCHIVE</span>
                </div>

                <a
                  href={`/work/${nextProject.slug}`}
                  className="paper-card p-8 bg-white border border-[#121210] hover:bg-[#121210] hover:text-[#F9F8F5] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono-code text-[#E63B2E] font-bold uppercase">
                      NEXT CASE STUDY →
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display font-medium">
                      {nextProject.title}
                    </h3>
                    <p className="text-sm font-sans text-[#5A5852] group-hover:text-neutral-300">
                      {nextProject.category} • {nextProject.year}
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center shrink-0">
                    <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </div>
            )}
          </div>
        </section>

        <ContactCTASection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
