import { redirect } from 'next/navigation';
import { defaultLocale } from '@/config/i18n';

export const dynamic = 'force-dynamic';

export default function ProjectsRedirect() {
  // Redirect to the default locale projects page
  redirect(`/${defaultLocale}/projects`);
} 