import { Feed } from 'feed';
import { getAllPosts } from '../lib/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await getAllPosts();
  const siteURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cedric-pronzola.re';
  const date = new Date();
  
  const author = {
    name: "Cédric Famibelle-Pronzola",
    email: "contact@cedric-pronzola.re",
    link: siteURL
  };

  const feed = new Feed({
    title: "Cédric Famibelle-Pronzola - Blog",
    description: "Articles sur le développement web, les logiciels libres, l'informatique et la politique.",
    id: siteURL,
    link: siteURL,
    language: "fr",
    image: `${siteURL}/cedric-avatar.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `Creative Commons BY-NC-SA 4.0 ${date.getFullYear()}, Cédric Famibelle-Pronzola`,
    updated: date,
    generator: "Next.js using Feed",
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
      atom: `${siteURL}/atom.xml`,
    },
    author
  });

  posts.forEach(post => {
    const url = `${siteURL}/blog/${post.slug}`;
    
    // Parse date string - handle both ISO format and custom formats
    let parsedDate;
    // Check if it's already ISO format 
    if (post.date.match(/^\d{4}-\d{2}-\d{2}T/)) {
      parsedDate = new Date(post.date);
    } else {
      // Try to parse from french date format "DD mois YYYY"
      const frenchMonths: Record<string, number> = {
        'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5, 
        'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
      };
      
      const dateMatch = post.date.match(/(\d+)\s+([^\s]+)\s+(\d{4})/);
      if (dateMatch) {
        const [_, day, month, year] = dateMatch;
        const monthIndex = frenchMonths[month.toLowerCase()];
        
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
    
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      author: [
        {
          name: post.author.name,
          link: post.author.url
        }
      ],
      date: parsedDate,
      image: ogImageUrl.toString()
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