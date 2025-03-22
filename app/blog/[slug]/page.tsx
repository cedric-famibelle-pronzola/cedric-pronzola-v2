import { redirect } from 'next/navigation';
import { defaultLocale } from '@/config/i18n';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogRedirect({ params }: Props) {
  const { slug } = await params;
  
  // Redirect to the default locale blog post
  redirect(`/${defaultLocale}/blog/${slug}`);
} 