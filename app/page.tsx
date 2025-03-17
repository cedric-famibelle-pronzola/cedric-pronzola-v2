import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Cédric Famibelle-Pronzola | Concepteur et Développeur Web/Mobile | Libriste",
  description: "Cédric Famibelle-Pronzola, concepteur et développeur Web/Mobile passionné par les technologies libres et l'innovation numérique.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cédric Famibelle-Pronzola | Concepteur et Développeur Web/Mobile | Libriste",
    description: "Cédric Famibelle-Pronzola, concepteur et développeur Web/Mobile passionné par les technologies libres et l'innovation numérique.",
    url: "/",
    images: [
      {
        url: "/api/og?title=Cédric Famibelle-Pronzola&subtitle=Concepteur et Développeur Web/Mobile | Libriste",
        width: 1200,
        height: 630,
        alt: "Cédric Famibelle-Pronzola - Concepteur et Développeur Web/Mobile | Libriste",
      },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Cédric Famibelle-Pronzola",
  "url": "https://cedric-pronzola.re",
  "image": "https://cedric-pronzola.re/cedric-avatar.png",
  "sameAs": [
    "https://github.com/ced972",
    "https://x.com/CedricPronzola",
    "https://youtube.com/@ced97240",
    "https://gade.o-k-i.net/@ced972",
    "https://instagram.com/cedric_kaubuntu",
    "https://bsky.app/profile/ced972.bsky.social",
  ],
  "jobTitle": "Concepteur et Développeur Web/Mobile",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "description": "Concepteur et Développeur Web/Mobile spécialisé dans les technologies libres et modernes."
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <JsonLd data={personJsonLd} />
    </>
  );
} 