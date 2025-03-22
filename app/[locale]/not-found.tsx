'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { defaultLocale } from '@/config/i18n';

export default function LocaleNotFound() {
  // Need to use useParams() and client-side redirect for not-found.tsx
  const params = useParams();
  const router = useRouter();
  const locale = typeof params?.locale === 'string' ? params.locale : defaultLocale;
  
  // Use useEffect to handle the redirection
  useEffect(() => {
    router.replace(`/${locale}/404`);
  }, [locale, router]);
  
  // Return empty div while redirecting
  return <div aria-hidden="true" />;
} 