'use client';

import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { locales, localeCountryMap } from '@/config/i18n';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // Remove locale prefix from pathname if it exists
  const pathnameWithoutLocale = pathname.replace(new RegExp(`^/(${locales.join('|')})($|/)`), '/');

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) return; // Don't navigate to same locale
    
    // Create the new path based on the locale
    const newPath = `/${locale}${pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale}`;
    
    // Use window.location for a full page navigation instead of client-side routing
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
