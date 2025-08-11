import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Contact from '../components/Contact';
import JsonLd from '../components/JsonLd';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/config/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: `Cédric Famibelle-Pronzola | ${t('hero.subtitle')}`,
    description: `${t('about.paragraph1')} ${t('about.paragraph2')}`,
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Cédric Famibelle-Pronzola",
    "url": "https://cedric-pronzola.dev",
    "image": "https://cedric-pronzola.dev/cedric-avatar.png",
    "sameAs": [
      "https://github.com/cedric-famibelle-pronzola",
      "https://twitter.com/CedricPronzola"
    ],
    "jobTitle": "Développeur Web/Mobile",
    "worksFor": {
      "@type": "Organization",
      "name": "Indépendant"
    },
    "description": "Développeur Web/Mobile, Libriste et défenseur du logiciel libre."
  };

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
      <JsonLd data={jsonLd} />
    </>
  );
}
