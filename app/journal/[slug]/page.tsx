import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTASection from '@/components/ContactCTASection';
import { getArticleBySlug, getArticles, getSettings } from '@/lib/db';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, User, Tag } from 'lucide-react';

interface ArticleProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.seoTitle || `${article.title} — Abu Bakr`,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage]
    }
  };
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const settings = getSettings();
  const allArticles = getArticles(true);

  if (!article) {
    notFound();
  }

  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F5]">
      <Navbar availableForWork={settings.availableForWork} />

      <main className="flex-grow">
        {/* Navigation Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <a
            href="/journal"
            className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[#7A7870] hover:text-[#E63B2E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL WRITINGS</span>
          </a>
        </div>

        {/* Article Monograph Header */}
        <article className="pt-8 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="stamp-tag bg-[#121210] text-[#F9F8F5]">
                  {article.category}
                </span>
                <span className="text-xs font-mono-code text-[#7A7870] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.publishedDate}
                </span>
                <span className="text-xs font-mono-code text-[#7A7870] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-display font-medium text-[#121210] leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-[#5A5852] font-light leading-relaxed">
                {article.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-3 border-t border-[#E5E0D6] text-xs font-mono-code text-[#7A7870]">
                <span>BY {article.author.toUpperCase()}</span>
                <span>•</span>
                <span>DISPATCH FROM DHAKA, BANGLADESH</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-16/9 overflow-hidden bg-[#181816] border border-[#121210] shadow-md">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Article Body Content */}
            <div className="prose prose-neutral max-w-none pt-6 text-[#2A2926] leading-relaxed text-base sm:text-lg font-light space-y-6">
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={idx}
                      className="text-2xl sm:text-3xl font-display font-medium text-[#121210] pt-6 pb-2 border-b border-[#E5E0D6]"
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={idx} className="my-8 border-[#E5E0D6]" />;
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote
                      key={idx}
                      className="p-6 bg-[#F2EFE9] border-l-4 border-[#E63B2E] italic font-serif text-xl text-[#121210]"
                    >
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags Strip */}
            <div className="pt-8 border-t border-[#E5E0D6] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono-code text-[#8A8880] mr-2">TOPICS:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#F2EFE9] text-xs font-mono-code text-[#4A4842]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="pt-16 border-t-2 border-[#121210] space-y-6">
                <h3 className="text-2xl font-display font-medium text-[#121210]">
                  Continue Reading
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {related.map((rel) => (
                    <a
                      key={rel.id}
                      href={`/journal/${rel.slug}`}
                      className="paper-card p-6 bg-white border border-[#E5E0D6] hover:border-[#121210] transition-colors space-y-2 block"
                    >
                      <span className="text-[10px] font-mono-code text-[#E63B2E] font-bold uppercase">
                        {rel.category}
                      </span>
                      <h4 className="text-xl font-display font-medium text-[#121210]">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#5A5852] line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <ContactCTASection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
