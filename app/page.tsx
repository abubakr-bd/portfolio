import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import QuickIdentity from '@/components/QuickIdentity';
import WhoAmISection from '@/components/WhoAmISection';
import WhatIDoSection from '@/components/WhatIDoSection';
import SelectedWorkSection from '@/components/SelectedWorkSection';
import FeaturedCaseStudy from '@/components/FeaturedCaseStudy';
import CurrentlyBuildingSection from '@/components/CurrentlyBuildingSection';
import ExperienceSection from '@/components/ExperienceSection';
import ToolboxSection from '@/components/ToolboxSection';
import MadeInBangladeshSection from '@/components/MadeInBangladeshSection';
import VisionSection from '@/components/VisionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NumbersSection from '@/components/NumbersSection';
import JournalSection from '@/components/JournalSection';
import ContactCTASection from '@/components/ContactCTASection';
import Footer from '@/components/Footer';
import {
  getSettings,
  getProjects,
  getCurrentlyBuilding,
  getExperiences,
  getSkills,
  getTestimonials,
  getArticles,
} from '@/lib/db';

export default function HomePage() {
  const settings = getSettings();
  const projects = getProjects(true);
  const currentlyBuilding = getCurrentlyBuilding();
  const experiences = getExperiences();
  const skills = getSkills();
  const testimonials = getTestimonials();
  const articles = getArticles(true).slice(0, 3);

  // Flagship project for the featured case study spotlight (Motionly or first featured)
  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 01 — NAVIGATION */}
      <Navbar availableForWork={settings.availableForWork} />

      <main className="flex-grow">
        {/* 02 — HERO */}
        <HeroSection settings={settings} />

        {/* 03 — QUICK IDENTITY */}
        <QuickIdentity />

        {/* 04 — WHO AM I? */}
        <WhoAmISection settings={settings} />

        {/* 05 — WHAT I DO */}
        <WhatIDoSection />

        {/* 06 — SELECTED WORK */}
        <SelectedWorkSection projects={projects} />

        {/* 07 — FEATURED CASE STUDY */}
        <FeaturedCaseStudy project={featuredProject} />

        {/* 08 — CURRENTLY BUILDING */}
        <CurrentlyBuildingSection items={currentlyBuilding} />

        {/* 09 — EXPERIENCE TIMELINE */}
        <ExperienceSection items={experiences} />

        {/* 10 — MY TOOLBOX */}
        <ToolboxSection categories={skills} />

        {/* 11 — MADE IN BANGLADESH */}
        <MadeInBangladeshSection settings={settings} />

        {/* 12 — THE VISION */}
        <VisionSection settings={settings} />

        {/* 13 — TESTIMONIALS */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 14 — NUMBERS / PROOF */}
        <NumbersSection stats={settings.stats} />

        {/* 15 — JOURNAL */}
        <JournalSection articles={articles} />

        {/* 16 — FINAL CTA */}
        <ContactCTASection settings={settings} />
      </main>

      {/* 17 — FOOTER */}
      <Footer settings={settings} />
    </div>
  );
}
