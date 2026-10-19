import type { Metadata } from "next";
import "./globals.css";
import { getSettings } from "@/lib/db";
import SEOJsonLd from "@/components/SEOJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();

  return {
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | ${settings.name}`
    },
    description: settings.defaultSeoDescription,
    keywords: [
      settings.name,
      `${settings.name} Bangladesh`,
      `${settings.name} entrepreneur`,
      `${settings.name} designer`,
      "Bangladesh web designer",
      "Bangladesh video editor",
      "young entrepreneur Bangladesh",
      "Motionly Media",
      "EquiSaaS BD",
      "Creative Director Dhaka",
      "Next.js Developer Bangladesh"
    ],
    authors: [{ name: settings.name }],
    creator: settings.name,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      siteName: `${settings.name} — Personal Digital Identity`,
      images: [
        {
          url: settings.profileImage,
          width: 1200,
          height: 630,
          alt: `${settings.name} — Designer & Builder from Bangladesh`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      images: [settings.profileImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSettings();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <SEOJsonLd settings={settings} />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#F9F8F5] text-[#121210]">
        {children}
      </body>
    </html>
  );
}
