'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, defaultLocale } from '@/config/i18n';

// Need to use client component for reliable locale detection in 404 page
export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Try to extract locale from URL path if available
    let currentLocale = defaultLocale;
    
    // Check if the path starts with a locale
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as any)) {
      currentLocale = segments[0];
    }
    
    // Redirect to the 404 page in the current locale
    router.replace(`/${currentLocale}/404`);
  }, [pathname, router]);
  
  // Return empty div while redirecting
  return <div aria-hidden="true" />;
} 