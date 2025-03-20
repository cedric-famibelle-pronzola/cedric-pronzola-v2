import { getAllPosts } from '../lib/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await getAllPosts();
  const siteURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cedric-pronzola.re';
  
  // Parse dates and handle various date formats
  const parsedPosts = posts.map(post => {
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
    
    return {
      ...post,
      dateFormatted: parsedDate.toISOString(),
    };
  });

  const jsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Cédric Famibelle-Pronzola - Blog",
    home_page_url: siteURL,
    feed_url: `${siteURL}/feed.json`,
    description: "Articles sur le développement web, les logiciels libres, l'informatique et la politique.",
    icon: `${siteURL}/cedric-avatar.png`,
    favicon: `${siteURL}/favicon.ico`,
    authors: [
      {
        name: "Cédric Famibelle-Pronzola",
        url: siteURL,
        avatar: `${siteURL}/cedric-avatar.png`
      }
    ],
    language: "fr",
    items: parsedPosts.map(post => ({
      id: `${siteURL}/blog/${post.slug}`,
      url: `${siteURL}/blog/${post.slug}`,
      title: post.title,
      content_html: `<p>${post.description}</p>`,
      summary: post.description,
      date_published: post.dateFormatted,
      authors: [
        {
          name: post.author.name,
          url: post.author.url
        }
      ]
    }))
  };
  
  // Return the JSON with appropriate content type
  return NextResponse.json(jsonFeed);
} 