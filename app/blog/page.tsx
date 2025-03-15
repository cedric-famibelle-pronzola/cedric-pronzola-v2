import { Metadata, Viewport } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogContent from '../components/BlogContent';
import JsonLd from '../components/JsonLd';

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles et réflexions sur le développement web, les technologies libres, l'écosystème numérique et la politique par Cédric Famibelle-Pronzola.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Cédric Famibelle-Pronzola",
    description: "Articles et réflexions sur le développement web, les technologies libres, l'écosystème numérique et la politique par Cédric Famibelle-Pronzola.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/api/og?title=Blog&subtitle=Développement web,technologies libres et politique",
        width: 1200,
        height: 630,
        alt: "Blog de Cédric Famibelle-Pronzola",
      },
    ],
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "headline": "Blog de Cédric Famibelle-Pronzola",
  "description": "Articles et réflexions sur le développement web, les technologies libres, l'écosystème numérique et la politique.",
  "author": {
    "@type": "Person",
    "name": "Cédric Famibelle-Pronzola",
    "url": "https://cedric-pronzola.re"
  },
  "publisher": {
    "@type": "Person",
    "name": "Cédric Famibelle-Pronzola",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cedric-pronzola.re/cedric-avatar.png"
    }
  },
  "url": "https://cedric-pronzola.re/blog",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://cedric-pronzola.re/blog"
  },
  "blogPost": [
    {
      "@type": "BlogPosting",
      "headline": "L’indépendance de La Réunion !",
      "description": "Discours prononcé le 21 janvier 2025 à Bakou (Azerbaïdjan).",
      "datePublished": "25 janvier 2025",
      "author": {
        "@type": "Person",
        "name": "Cédric Famibelle-Pronzola"
      },
      "url": "https://cedric-pronzola.re/blog/l-independance-de-la-reunion"
    },
    {
      "@type": "BlogPosting",
      "headline": "Les logiciels libres nous libéreront !",
      "description": "Découvrez comment les logiciels libres peuvent améliorer votre flux de travail de développement et contribuer à un écosystème web plus ouvert.",
      "datePublished": "8 décembre 2024",
      "author": {
        "@type": "Person",
        "name": "Cédric Famibelle-Pronzola"
      },
      "url": "https://cedric-pronzola.re/blog/les-logiciels-libres-nous-libereront"
    }
  ]
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogContent />
      <Footer />
      <JsonLd data={blogJsonLd} />
    </>
  );
} 