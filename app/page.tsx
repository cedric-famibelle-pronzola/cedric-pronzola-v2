import { redirect } from 'next/navigation';
import { defaultLocale } from '@/config/i18n';

export const dynamic = 'force-dynamic';

// Root page that redirects to the default locale
export default function Home() {
  redirect(`/${defaultLocale}`);
} 