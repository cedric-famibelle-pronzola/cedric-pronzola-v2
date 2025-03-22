import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import AnimatedSection from '../../../components/AnimatedSection';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import JsonLd from '../../../components/JsonLd';
import MarkdownContent from '../../../components/MarkdownContent';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Map article slugs between languages
const articleSlugMap: Record<string, Record<string, string>> = {
  // English articles
  'en': {
    'reunion-independence': 'l-independance-de-la-reunion',
    'free-software-will-liberate-us': 'les-logiciels-libres-nous-libereront'
  },
  // French articles
  'fr': {
    'l-independance-de-la-reunion': 'reunion-independence',
    'les-logiciels-libres-nous-libereront': 'free-software-will-liberate-us'
  }
};

// Function to get equivalent slug in another language
function getSlugInOtherLocale(slug: string, currentLocale: string, targetLocale: string): string {
  if (currentLocale === targetLocale) return slug;
  
  // Get the mapping for current locale
  const mappings = articleSlugMap[currentLocale];
  
  // If mapping exists, return the mapped slug, otherwise return the original
  return mappings?.[slug] || slug;
}

// Function to convert markdown to HTML
async function markdownToHtml(markdown: string) {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(markdown);
      
    return result.toString();
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return `<p>Error rendering content</p>`;
  }
}

// Function to get article content
async function getArticleContent(slug: string, locale: string) {
  try {
    // Try to get the article from the localized folder
    const localizedPath = path.join(process.cwd(), 'app/articles', locale, `${slug}.md`);
    
    // Check if the file exists in the localized folder
    try {
      const fileContent = await fs.readFile(localizedPath, 'utf8');
      
      // Parse frontmatter from markdown
      const { data, content } = matter(fileContent);
      
      return {
        content,
        metadata: {
          title: data.title || slug.replace(/-/g, ' '),
          description: data.description || '',
          date: data.date || '',
          author: {
            name: data.author?.name || 'Cédric Famibelle-Pronzola',
            url: data.author?.url || 'https://cedric-pronzola.re'
          },
          slug: slug
        }
      };
    } catch (error) {
      // If we can't find the file in the localized folder, try other approaches
      console.log(`Article not found in ${locale} folder as ${slug}.md, trying alternative approaches...`);
      
      // Try with a mapped slug if available
      const otherLocale = locale === 'en' ? 'fr' : 'en';
      const alternativeSlug = getSlugInOtherLocale(slug, locale, otherLocale);
      
      // Check if we got a different slug from the mapping
      if (alternativeSlug !== slug) {
        // Try with the alternative slug in the current locale folder
        try {
          const alternativePath = path.join(process.cwd(), 'app/articles', locale, `${alternativeSlug}.md`);
          const fileContent = await fs.readFile(alternativePath, 'utf8');
          
          // Parse frontmatter from markdown
          const { data, content } = matter(fileContent);
          
          return {
            content,
            metadata: {
              title: data.title || alternativeSlug.replace(/-/g, ' '),
              description: data.description || '',
              date: data.date || '',
              author: {
                name: data.author?.name || 'Cédric Famibelle-Pronzola',
                url: data.author?.url || 'https://cedric-pronzola.re'
              },
              slug: slug // Keep the original slug
            }
          };
        } catch (alternativeError) {
          console.log(`Alternative approach with ${alternativeSlug} also failed.`);
        }
      }
      
      // Final fallback: try the non-localized folder
      try {
        const defaultPath = path.join(process.cwd(), 'app/articles', `${slug}.md`);
        const fileContent = await fs.readFile(defaultPath, 'utf8');
        
        // Parse frontmatter from markdown
        const { data, content } = matter(fileContent);
        
        return {
          content,
          metadata: {
            title: data.title || slug.replace(/-/g, ' '),
            description: data.description || '',
            date: data.date || '',
            author: {
              name: data.author?.name || 'Cédric Famibelle-Pronzola',
              url: data.author?.url || 'https://cedric-pronzola.re'
            },
            slug: slug
          }
        };
      } catch (fallbackError) {
        console.log(`All attempts to load article ${slug} failed.`);
        throw fallbackError; // Re-throw to be caught by the outer catch
      }
    }
  } catch (error) {
    console.error(`Error reading article content for slug: ${slug}`, error);
    return null;
  }
}

// Generate metadata for the article page
export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } }
): Promise<Metadata> {
  // Need to await params to avoid errors
  const paramValues = await Promise.resolve(params);
  const { slug, locale } = paramValues;
  
  const t = await getTranslations({ locale, namespace: 'blog' });
  const article = await getArticleContent(slug, locale);
  
  if (!article) {
    return {
      title: t('title'),
      description: t('description')
    };
  }
  
  return {
    title: `${article.metadata.title} | ${t('title')}`,
    description: article.metadata.description || t('description'),
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description || t('description'),
      url: `/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: article.metadata.date,
      authors: [article.metadata.author.name],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(article.metadata.title)}&subtitle=${encodeURIComponent(article.metadata.description || '')}`,
          width: 1200,
          height: 630,
          alt: article.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metadata.title,
      description: article.metadata.description || t('description'),
      images: [`/api/og?title=${encodeURIComponent(article.metadata.title)}&subtitle=${encodeURIComponent(article.metadata.description || '')}`],
    }
  };
}

// Main component for the article page
export default async function ArticlePage(
  { params }: { params: { locale: string; slug: string } }
) {
  // Need to await params to avoid errors
  const paramValues = await Promise.resolve(params);
  const { slug, locale } = paramValues;
  
  const article = await getArticleContent(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  // If article doesn't exist, return 404
  if (!article) {
    notFound();
  }
  
  // Convert markdown to HTML
  const htmlContent = await markdownToHtml(article.content);
  
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <AnimatedSection className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12">
              <a 
                href={`/${locale}/blog`} 
                className="inline-flex items-center text-foreground/70 hover:text-foreground transition-colors mb-8"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                {t('backToArticles')}
              </a>
            </div>
            
            <article className="prose prose-lg dark:prose-invert mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.metadata.title}</h1>
              <div className="text-sm text-gray-500 mb-12">
                <time dateTime={article.metadata.date}>{article.metadata.date}</time> • 
                <span className="ml-2">{article.metadata.author.name}</span>
              </div>
              <MarkdownContent content={htmlContent} />
            </article>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
      
      <JsonLd 
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': article.metadata.title,
          'description': article.metadata.description,
          'datePublished': article.metadata.date,
          'author': {
            '@type': 'Person',
            'name': article.metadata.author.name,
            'url': article.metadata.author.url
          },
          'publisher': {
            '@type': 'Person',
            'name': 'Cédric Famibelle-Pronzola'
          },
          'url': `https://cedric-pronzola.re/blog/${slug}`,
          '@id': `https://cedric-pronzola.re/blog/${slug}`,
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://cedric-pronzola.re/blog/${slug}`
          }
        }} 
      />
    </>
  );
} 