import { redirect } from 'next/navigation';

export function GET() {
  // Maintain backward compatibility by redirecting to the English feed
  redirect('/en/rss.xml');
} 