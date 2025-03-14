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
  title: "Accueil",
  description: "Cédric Famibelle-Pronzola, développeur web passionné par les technologies libres et l'innovation numérique.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cédric Famibelle-Pronzola | Développeur Web",
    description: "Cédric Famibelle-Pronzola, développeur web passionné par les technologies libres et l'innovation numérique.",
    url: "/",
    images: [
      {
        url: "/api/og?title=Cédric Famibelle-Pronzola&subtitle=Développeur Web - Libriste",
        width: 1200,
        height: 630,
        alt: "Cédric Famibelle-Pronzola - Développeur Web",
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
    "https://bsky.app/profile/ced972.bsky.social",
    "https://linkedin.com/in/cedric-famibelle-pronzola"
  ],
  "jobTitle": "Développeur Web",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "description": "Développeur web spécialisé dans les technologies libres et modernes."
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