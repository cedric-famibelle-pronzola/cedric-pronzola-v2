'use client';

import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { locales, localeCountryMap } from '@/config/i18n';

// Map article slugs between languages (copied from article page for consistency)
const articleSlugMap: Record<string, Record<string, string>> = {
  // English articles
  'en': {
    'forced-assimilation-and-eradication-of-local-culture': 'l-assimilation-forcee-et-l-eradication-de-la-culture-locale',
    'reunion-independence': 'l-independance-de-la-reunion',
    'free-software-will-liberate-us': 'les-logiciels-libres-nous-libereront'
  },
  // French articles
  'fr': {
    'l-assimilation-forcee-et-l-eradication-de-la-culture-locale': 'forced-assimilation-and-eradication-of-local-culture',
    'l-independance-de-la-reunion': 'reunion-independence',
    'les-logiciels-libres-nous-libereront': 'free-software-will-liberate-us'
  }
};

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // Remove locale prefix from pathname if it exists
  const pathnameWithoutLocale = pathname.replace(new RegExp(`^/(${locales.join('|')})($|/)`), '/');

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) return; // Don't navigate to same locale
    
    // Check if we're on an article page by matching the path pattern
    const articlePathRegex = /^\/blog\/([^\/]+)$/;
    const match = pathnameWithoutLocale.match(articlePathRegex);
    
    if (match) {
      // We're on an article page, get the current slug
      const currentSlug = match[1];
      
      // Find the equivalent slug in the target language
      let targetSlug = currentSlug;
      
      // Look up the mapping from current locale to target locale
      const localeMap = articleSlugMap[currentLocale as keyof typeof articleSlugMap];
      if (localeMap && localeMap[currentSlug]) {
        targetSlug = localeMap[currentSlug];
      }
      
      // Create the new path with the mapped slug
      const newPath = `/${locale}/blog/${targetSlug}`;
      window.location.href = newPath;
      return;
    }
    
    // For non-article pages, use the standard path
    const newPath = `/${locale}${pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale}`;
    window.location.href = newPath;
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        // Get the country code for the flag emoji
        const countryCode = localeCountryMap[locale as keyof typeof localeCountryMap];
        
        return (
          <button
            key={locale}
            className={`flex items-center justify-center h-6 w-6 rounded-full overflow-hidden cursor-pointer ${
              isActive ? 'ring-2 ring-primary ring-offset-1' : 'opacity-70 hover:opacity-100'
            } ${isPending ? 'opacity-50' : ''}`}
            aria-label={`Switch to ${locale === 'en' ? 'English' : 'Français'}`}
            disabled={isPending}
            onClick={() => handleLocaleChange(locale)}
            type="button"
          >
            <span className={`fi fi-${countryCode}`} />
          </button>
        );
      })}
    </div>
  );
}
