'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { defaultLocale } from '@/config/i18n';

export default function NotFoundPage() {
  // Get locale from client-side route params
  const params = useParams();
  const locale = typeof params?.locale === 'string' ? params.locale : defaultLocale;
  
  // Simple hard-coded content based on locale
  const content = locale === 'fr' ? {
    title: '404',
    heading: 'Page non trouvée',
    description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    returnHome: 'Retour à l\'accueil'
  } : {
    title: '404',
    heading: 'Page not found',
    description: 'The page you are looking for doesn\'t exist or has been moved.',
    returnHome: 'Return home'
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background text-foreground">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">{content.title}</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">{content.heading}</h2>
      <p className="text-lg mb-8 max-w-md">
        {content.description}
      </p>
      <Link
        href={`/${locale}`}
        className="px-6 py-3 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
        replace
      >
        {content.returnHome}
      </Link>
    </div>
  );
} 