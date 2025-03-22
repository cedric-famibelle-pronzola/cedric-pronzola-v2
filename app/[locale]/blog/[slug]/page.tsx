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
async function getArticleContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'app/articles', `${slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    
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
    console.error(`Error reading article content for slug: ${slug}`, error);
    return null;
  }
}

// Generate metadata for the article page
export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } }
): Promise<Metadata> {
  // Need to await params before destructuring
  const paramValues = await Promise.resolve(params);
  const { slug, locale } = paramValues;
  
  const t = await getTranslations('blog');
  const article = await getArticleContent(slug);
  
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
  };
}

// Main component for the article page
export default async function ArticlePage(
  { params }: { params: { locale: string; slug: string } }
) {
  // Need to await params before destructuring
  const paramValues = await Promise.resolve(params);
  const { slug, locale } = paramValues;
  
  const article = await getArticleContent(slug);
  const t = await getTranslations('blog');
  
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