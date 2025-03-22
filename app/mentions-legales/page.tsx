import { redirect } from 'next/navigation';
import { defaultLocale } from '@/config/i18n';

export const dynamic = 'force-dynamic';

export default function LegalRedirect() {
  // Redirect to the default locale legal page
  redirect(`/${defaultLocale}/mentions-legales`);
} 