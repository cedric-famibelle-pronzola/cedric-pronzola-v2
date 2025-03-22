import { redirect } from 'next/navigation';

export function GET(request: Request, { params }: { params: { locale: string } }) {
  const locale = params.locale;
  redirect(`/${locale}/rss.xml`);
} 