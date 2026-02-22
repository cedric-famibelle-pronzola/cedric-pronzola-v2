"use client";

import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import type { BlogPostMetadata } from '../types/blog';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import DateFormatter from './DateFormatter';

interface BlogContentProps {
  posts: BlogPostMetadata[];
}

const BlogContent = ({ posts }: BlogContentProps) => {
  const t = useTranslations('blog');
  const params = useParams();
  const locale = params.locale as string;
  
  return (
    <main className="pt-24">
      <AnimatedSection className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-2">
              <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
              <a 
                href={`/${locale}/rss.xml`} 
                target="_blank"
                rel="noopener"
                className="ml-4 text-foreground/60 hover:text-foreground transition-colors" 
                title={t('rssTitle')}
                aria-label={t('rssAriaLabel')}
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
                >
                  <path d="M4 11a9 9 0 0 1 9 9"></path>
                  <path d="M4 4a16 16 0 0 1 16 16"></path>
                  <circle cx="5" cy="19" r="1"></circle>
                </svg>
              </a>
            </div>
            <div className="w-20 h-1 bg-foreground/20 mx-auto mt-4"></div>
            <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <a 
                href={`/${locale}/rss.xml`} 
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener"
              >
                RSS
              </a>
              <span className="text-foreground/30">•</span>
              <a 
                href={`/${locale}/atom.xml`} 
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener"
              >
                Atom
              </a>
              <span className="text-foreground/30">•</span>
              <a 
                href={`/${locale}/feed.json`} 
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener"
              >
                JSON
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <AnimatedSection 
                key={post.slug}
                delay={0.1 * index}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <article
                  className="bg-background border border-foreground/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full hover:-translate-y-1"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                      <DateFormatter date={post.date} locale={locale} className="text-sm text-foreground/60" />
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                    <p className="text-foreground/70 mb-6 flex-grow">{post.description}</p>
                    
                    <Link 
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium hover:underline mt-auto"
                    >
                      {t('readArticle')}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default BlogContent;
