"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

// Sample blog posts - replace with your actual blog posts
const blogPosts = [
  {
    id: 1,
    title: "Les avantages du logiciel libre dans le développement web",
    excerpt: "Découvrez comment les logiciels libres peuvent améliorer votre flux de travail de développement et contribuer à un écosystème web plus ouvert.",
    date: "15 mars 2023",
    category: "Open Source",
    slug: "avantages-logiciel-libre-developpement-web",
  },
  {
    id: 2,
    title: "Comment optimiser les performances de votre application Next.js",
    excerpt: "Apprenez les meilleures pratiques pour améliorer les performances de votre application Next.js, de l'optimisation des images à la mise en cache.",
    date: "22 janvier 2023",
    category: "Performance",
    slug: "optimiser-performances-application-nextjs",
  },
  {
    id: 3,
    title: "Introduction à Deno : une alternative moderne à Node.js",
    excerpt: "Explorez Deno, le runtime JavaScript sécurisé créé par le fondateur de Node.js, et découvrez ses avantages pour le développement moderne.",
    date: "10 décembre 2022",
    category: "JavaScript",
    slug: "introduction-deno-alternative-nodejs",
  },
  {
    id: 4,
    title: "Créer des animations fluides avec Framer Motion",
    excerpt: "Guide pratique pour intégrer des animations élégantes dans vos applications React à l'aide de la bibliothèque Framer Motion.",
    date: "5 novembre 2022",
    category: "UI/UX",
    slug: "animations-fluides-framer-motion",
  },
];

const BlogContent = () => {
  return (
    <main className="pt-24">
      <AnimatedSection className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
            <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
              Mes réflexions sur le développement web, les technologies libres et l&apos;écosystème numérique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection 
                key={post.id}
                delay={0.1 * index}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <motion.article
                  className="bg-background border border-foreground/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-foreground/60">{post.date}</span>
                      <span className="px-2 py-1 bg-foreground/5 text-foreground/70 rounded-md text-xs">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                    <p className="text-foreground/70 mb-6">{post.excerpt}</p>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium hover:underline"
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
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default BlogContent;

// Export blog posts for JSON-LD
export { blogPosts }; 