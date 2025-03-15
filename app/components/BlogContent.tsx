"use client";

import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import type { BlogPostMetadata } from '../types/blog';

interface BlogContentProps {
  posts: BlogPostMetadata[];
}

const BlogContent = ({ posts }: BlogContentProps) => {
  return (
    <main className="pt-24">
      <AnimatedSection className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
            <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
              Mes réflexions sur le développement web, les technologies libres et l'écosystème numérique et la politique.
            </p>
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
                      <time dateTime={post.date} className="text-sm text-foreground/60">{post.date}</time>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                    <p className="text-foreground/70 mb-6 flex-grow">{post.description}</p>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium hover:underline mt-auto"
                    >
                      Lire l&apos;article
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
