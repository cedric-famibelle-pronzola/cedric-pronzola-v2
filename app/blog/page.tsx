import { Metadata, Viewport } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogContent from '../components/BlogContent';
import JsonLd from '../components/JsonLd';
import { getAllPosts } from '../lib/blog';

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles et réflexions sur le développement web, les technologies libres, l'écosystème numérique et la politique par Cédric Famibelle-Pronzola.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Cédric Famibelle-Pronzola",
    description: "Articles et réflexions sur le développement web, les technologies libres, l'écosystème numérique et la politique par Cédric Famibelle-Pronzola.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/api/og?title=Blog&subtitle=Développement web,technologies libres et politique",
        width: 1200,
        height: 630,
        alt: "Blog de Cédric Famibelle-Pronzola",
      },
    ],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const safePosts = Array.isArray(posts) ? posts : [];
  
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": "Blog de Cédric Famibelle-Pronzola",
    "description": "Articles et réflexions sur le développement web, les technologies libres, l'écosystème numérique et la politique.",
    "author": {
      "@type": "Person",
      "name": "Cédric Famibelle-Pronzola",
      "url": "https://cedric-pronzola.re"
    },
    "publisher": {
      "@type": "Person",
      "name": "Cédric Famibelle-Pronzola",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cedric-pronzola.re/cedric-avatar.png"
      }
    },
    "url": "https://cedric-pronzola.re/blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://cedric-pronzola.re/blog"
    },
    "blogPost": safePosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author.name
      },
      "url": `https://cedric-pronzola.re/blog/${post.slug}`
    }))
  };

  return (
    <>
      <Navbar />
      <BlogContent posts={safePosts} />
      <Footer />
      <JsonLd data={blogJsonLd} />
    </>
  );
} 