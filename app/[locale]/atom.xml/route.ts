import { Feed } from 'feed';
import { getAllPosts } from '../../lib/blog';
import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

export async function GET(request: Request, { params }: { params: { locale: string } }) {
  const locale = params.locale;
  
  // Get localized articles for this feed
  const posts = await getAllPosts(locale);
  
  // Get translations for feed descriptions
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  const siteURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cedric-pronzola.re';
  const date = new Date();
  
  const author = {
    name: "Cédric Famibelle-Pronzola",
    email: "contact@cedric-pronzola.re",
    link: siteURL
  };

  const feed = new Feed({
    title: `Cédric Famibelle-Pronzola - ${t('title')}`,
    description: t('description'),
    id: siteURL,
    link: siteURL,
    language: locale,
    image: `${siteURL}/cedric-avatar.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `Creative Commons BY-NC-SA 4.0 ${date.getFullYear()}, Cédric Famibelle-Pronzola`,
    updated: date,
    generator: "Next.js using Feed",
    feedLinks: {
      rss2: `${siteURL}/${locale}/rss.xml`,
      atom: `${siteURL}/${locale}/atom.xml`,
    },
    author
  });

  posts.forEach(post => {
    const url = `${siteURL}/${locale}/blog/${post.slug}`;
    
    // Parse date string - handle both ISO format and custom formats
    let parsedDate;
    // Check if it's already ISO format 
    if (post.date.match(/^\d{4}-\d{2}-\d{2}T/)) {
      parsedDate = new Date(post.date);
    } else {
      // Try to parse from date format "DD month YYYY"
      const englishMonths: Record<string, number> = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5, 
        'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
      };
      
      const frenchMonths: Record<string, number> = {
        'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5, 
        'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
      };
      
      const dateMatch = post.date.match(/(\d+)\s+([^\s]+)\s+(\d{4})/);
      if (dateMatch) {
        const [_, day, month, year] = dateMatch;
        
        // Choose the correct month mapping based on locale
        const monthsMap = locale === 'en' ? englishMonths : frenchMonths;
        const monthIndex = monthsMap[month.toLowerCase()];
        
        if (monthIndex !== undefined) {
          parsedDate = new Date(parseInt(year), monthIndex, parseInt(day));
        } else {
          parsedDate = new Date(); // Fallback to current date
        }
      } else {
        parsedDate = new Date(); // Fallback to current date
      }
    }
    
    // Generate the OG image URL (same as used for Twitter cards)
    const ogImageUrl = new URL(`${siteURL}/api/og`);
    ogImageUrl.searchParams.set('title', post.title);
    ogImageUrl.searchParams.set('subtitle', post.description);
    
    // Include the image as part of the HTML content
    const descriptionWithImage = `
      <div>
        <img src="${ogImageUrl.toString()}" alt="${post.title}" style="max-width: 100%; height: auto; margin-bottom: 1rem;" />
        <p>${post.description}</p>
      </div>
    `;
    
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: descriptionWithImage,
      content: descriptionWithImage,
      author: [
        {
          name: post.author.name,
          link: post.author.url
        }
      ],
      date: parsedDate
    });
  });

  // Generate the Atom feed
  const atom = feed.atom1();
  
  // Return the XML with appropriate content type
  return new NextResponse(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8'
    }
  });
} 