import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeScript } from "./components/ThemeScript";

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
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: "Cédric Famibelle-Pronzola | Concepteur et Développeur Web/Mobile | Libriste",
    template: "%s | Cédric Famibelle-Pronzola"
  },
  description: "Cédric Famibelle-Pronzola, concepteur et développeur Web/Mobile spécialisé dans les technologies libres et modernes.",
  keywords: ["développeur", "web", "libriste", "open source", "javascript", "react", "next.js"],
  authors: [{ name: "Cédric Famibelle-Pronzola", url: "https://cedric-pronzola.re" }],
  creator: "Cédric Famibelle-Pronzola",
  publisher: "Cédric Famibelle-Pronzola",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cedric-pronzola.re"),
  alternates: {
    canonical: "/",
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'RSS Feed pour le blog de Cédric Famibelle-Pronzola' },
      ],
      'application/atom+xml': [
        { url: '/atom.xml', title: 'Atom Feed pour le blog de Cédric Famibelle-Pronzola' },
      ],
      'application/feed+json': [
        { url: '/feed.json', title: 'JSON Feed pour le blog de Cédric Famibelle-Pronzola' },
      ],
    },
  },
  openGraph: {
    title: "Cédric Famibelle-Pronzola | Concepteur et Développeur Web/Mobile | Libriste",
    description: "Cédric Famibelle-Pronzola, concepteur et développeur Web/Mobile spécialisé dans les technologies libres et modernes.",
    url: "https://cedric-pronzola.re",
    siteName: "Cédric Famibelle-Pronzola",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Cédric Famibelle-Pronzola | Concepteur et Développeur Web/Mobile | Libriste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cédric Famibelle-Pronzola | Concepteur et Développeur Web/Mobile | Libriste",
    description: "Cédric Famibelle-Pronzola, concepteur et développeur Web/Mobile spécialisé dans les technologies libres et modernes.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-background focus:text-foreground focus:p-4 focus:m-4 focus:rounded-md"
          >
            Aller au contenu principal
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
