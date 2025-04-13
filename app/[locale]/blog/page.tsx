import { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BlogContent from '../../components/BlogContent';
import JsonLd from '../../components/JsonLd';
import { getAllPosts } from '../../lib/blog';

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations('blog');

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: `${t('title')} | Cédric Famibelle-Pronzola`,
      description: t('description'),
      url: "/blog",
      type: "website",
      images: [
        {
          url: `/api/og?title=${t('title')}&subtitle=${t('subtitle')}`,
          width: 1200,
          height: 630,
          alt: t('ogAlt'),
        },
      ],
    },
  };
}

export default async function BlogPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  // Pass the locale to getAllPosts to get localized articles
  const posts = await getAllPosts(locale);
  const safePosts = Array.isArray(posts) ? posts : [];
  const t = await getTranslations('blog');

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": t('jsonLd.headline'),
    "description": t('jsonLd.description'),
    "author": {
      "@type": "Person",
      "name": "Cédric Famibelle-Pronzola",
      "url": "https://cedric-pronzola.dev"
    },
    "publisher": {
      "@type": "Person",
      "name": "Cédric Famibelle-Pronzola",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cedric-pronzola.dev/cedric-avatar.png"
      }
    },
    "url": "https://cedric-pronzola.dev/blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://cedric-pronzola.dev/blog"
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
      "url": `https://cedric-pronzola.dev/blog/${post.slug}`
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
