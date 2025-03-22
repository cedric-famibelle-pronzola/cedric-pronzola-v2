import { redirect } from 'next/navigation';
import { defaultLocale } from '@/config/i18n';

export const dynamic = 'force-dynamic';

export default function BlogIndexRedirect() {
  // Redirect to the default locale blog index
  redirect(`/${defaultLocale}/blog`);
} 