import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '../../lib/blog';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import JsonLd from '../../components/JsonLd';
import MarkdownContent from '../../components/MarkdownContent';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(slug => ({ slug }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Cédric Famibelle-Pronzola`,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@CedricPronzola",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ]
    }
  };
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.description,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'url': post.author.url,
    },
    'publisher': {
      '@type': 'Person',
      'name': post.author.name,
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://cedric-pronzola.re/cedric-avatar.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://cedric-pronzola.re/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 container mx-auto px-4 py-8">
        <article className="mx-auto">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-2 text-gray-400 mb-8">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <a href={post.author.url} className="hover:text-white transition-colors">
              {post.author.name}
            </a>
          </div>
          <MarkdownContent content={post.content} />
        </article>
      </main>
      <Footer />
      <JsonLd data={articleJsonLd} />
    </>
  );
} 