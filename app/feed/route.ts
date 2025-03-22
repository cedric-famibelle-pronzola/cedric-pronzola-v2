import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Maintain backward compatibility by redirecting to the English feed
  redirect('/en/rss.xml');
} 