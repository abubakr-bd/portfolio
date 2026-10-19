import React from 'react';
import { SiteSettings } from '@/lib/types';

interface SEOJsonLdProps {
  settings: SiteSettings;
  url?: string;
}

export default function SEOJsonLd({ settings, url = 'https://abubakr.me' }: SEOJsonLdProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.name,
    jobTitle: settings.title,
    description: settings.defaultSeoDescription,
    url: url,
    image: `${url}${settings.profileImage}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh'
    },
    knowsAbout: [
      'Web Design',
      'Web Development',
      'Video Editing',
      'Motion Design',
      'Graphic Design',
      'Brand Identity',
      'Entrepreneurship',
      'Next.js',
      'React',
      'TypeScript'
    ],
    sameAs: [
      settings.socialLinks.linkedin,
      settings.socialLinks.github,
      settings.socialLinks.instagram,
      settings.socialLinks.behance,
      settings.socialLinks.youtube,
      settings.socialLinks.x
    ].filter(Boolean)
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${settings.name} — Personal Digital Identity`,
    url: url,
    description: settings.defaultSeoDescription,
    publisher: {
      '@type': 'Person',
      name: settings.name
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
