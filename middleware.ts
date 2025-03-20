import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';

// Create middleware with French as the default language
export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale,
  
  // The default locale should be used when visiting
  // a non-existent locale (e.g. `/es/about`)
  localePrefix: 'as-needed',
  
  // Enable default locale detection based on headers/cookies/query
  localeDetection: true
});

export const config = {
  // Skip all paths that should not be internationalized. 
  // This includes images, fonts, API routes, etc.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
