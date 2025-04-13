import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from 'next/navigation';
import { locales } from '@/config/i18n';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import "flag-icons/css/flag-icons.min.css";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

// This is shared metadata for all pages - more specific metadata will be merged with this
export const metadata: Metadata = {
  title: {
    default: "Cédric Famibelle-Pronzola | Web/Mobile Developer | Free Software Advocate",
    template: "%s | Cédric Famibelle-Pronzola"
  },
  description: "Cédric Famibelle-Pronzola, web/mobile developer specialized in free and modern technologies.",
  keywords: ["developer", "web", "free software", "open source", "javascript", "react", "next.js"],
  authors: [{ name: "Cédric Famibelle-Pronzola", url: "https://cedric-pronzola.dev" }],
  creator: "Cédric Famibelle-Pronzola",
  publisher: "Cédric Famibelle-Pronzola",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cedric-pronzola.dev"),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/en',
      'fr': '/fr',
    },
    types: {
      'application/rss+xml': [
        { url: '/en/rss.xml', title: 'English RSS Feed for Cédric Famibelle-Pronzola\'s blog' },
        { url: '/fr/rss.xml', title: 'Flux RSS en français du blog de Cédric Famibelle-Pronzola' },
      ],
      'application/atom+xml': [
        { url: '/en/atom.xml', title: 'English Atom Feed for Cédric Famibelle-Pronzola\'s blog' },
        { url: '/fr/atom.xml', title: 'Flux Atom en français du blog de Cédric Famibelle-Pronzola' },
      ],
      'application/feed+json': [
        { url: '/en/feed.json', title: 'English JSON Feed for Cédric Famibelle-Pronzola\'s blog' },
        { url: '/fr/feed.json', title: 'Flux JSON en français du blog de Cédric Famibelle-Pronzola' },
      ],
    },
  },
  openGraph: {
    title: "Cédric Famibelle-Pronzola | Web/Mobile Developer | Free Software Advocate",
    description: "Cédric Famibelle-Pronzola, web/mobile developer specialized in free and modern technologies.",
    url: "https://cedric-pronzola.dev",
    siteName: "Cédric Famibelle-Pronzola",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Cédric Famibelle-Pronzola | Web/Mobile Developer | Free Software Advocate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cédric Famibelle-Pronzola | Web/Mobile Developer | Free Software Advocate",
    description: "Cédric Famibelle-Pronzola, web/mobile developer specialized in free and modern technologies.",
    creator: "@CedricPronzola",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  // Access params in a way that works with Next.js async context
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the current locale
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}`, error);
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-background focus:text-foreground focus:p-4 focus:m-4 focus:rounded-md"
        >
          {locale === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
        </a>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
