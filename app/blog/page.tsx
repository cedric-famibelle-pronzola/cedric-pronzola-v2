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
  description: "Articles et réflexions sur le développement web, les technologies libres et l'écosystème numérique par Cédric Famibelle-Pronzola.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Cédric Famibelle-Pronzola",
    description: "Articles et réflexions sur le développement web, les technologies libres et l'écosystème numérique.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/api/og?title=Blog&subtitle=Développement web et technologies libres",
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
  "description": "Articles et réflexions sur le développement web, les technologies libres et l'écosystème numérique.",
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
      "headline": "Les avantages du logiciel libre dans le développement web",
      "description": "Découvrez comment les logiciels libres peuvent améliorer votre flux de travail de développement et contribuer à un écosystème web plus ouvert.",
      "datePublished": "15 mars 2023",
      "author": {
        "@type": "Person",
        "name": "Cédric Famibelle-Pronzola"
      },
      "url": "https://cedric-pronzola.re/blog/avantages-logiciel-libre-developpement-web"
    },
    {
      "@type": "BlogPosting",
      "headline": "Comment optimiser les performances de votre application Next.js",
      "description": "Apprenez les meilleures pratiques pour améliorer les performances de votre application Next.js, de l'optimisation des images à la mise en cache.",
      "datePublished": "22 janvier 2023",
      "author": {
        "@type": "Person",
        "name": "Cédric Famibelle-Pronzola"
      },
      "url": "https://cedric-pronzola.re/blog/optimiser-performances-application-nextjs"
    },
    {
      "@type": "BlogPosting",
      "headline": "Introduction à Deno : une alternative moderne à Node.js",
      "description": "Explorez Deno, le runtime JavaScript sécurisé créé par le fondateur de Node.js, et découvrez ses avantages pour le développement moderne.",
      "datePublished": "10 décembre 2022",
      "author": {
        "@type": "Person",
        "name": "Cédric Famibelle-Pronzola"
      },
      "url": "https://cedric-pronzola.re/blog/introduction-deno-alternative-nodejs"
    },
    {
      "@type": "BlogPosting",
      "headline": "Créer des animations fluides avec Framer Motion",
      "description": "Guide pratique pour intégrer des animations élégantes dans vos applications React à l'aide de la bibliothèque Framer Motion.",
      "datePublished": "5 novembre 2022",
      "author": {
        "@type": "Person",
        "name": "Cédric Famibelle-Pronzola"
      },
      "url": "https://cedric-pronzola.re/blog/animations-fluides-framer-motion"
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