import { BlogPost, BlogPostMetadata } from '../types/blog';

const blogPosts: BlogPost[] = [
  {
    slug: 'l-independance-de-la-reunion',
    title: "L'indépendance de La Réunion !",
    description: "Discours prononcé le 21 janvier 2025 à Bakou (Azerbaïdjan).",
    date: "25 janvier 2025",
    content: `# L'indépendance de La Réunion !

Contenu de l'article à venir...`,
    author: {
      name: "Cédric Famibelle-Pronzola",
      url: "https://cedric-pronzola.re"
    }
  },
  {
    slug: 'les-logiciels-libres-nous-libereront',
    title: "Les logiciels libres nous libéreront !",
    description: "Découvrez comment les logiciels libres peuvent améliorer votre flux de travail de développement et contribuer à un écosystème web plus ouvert.",
    date: "8 décembre 2024",
    content: `# Les logiciels libres nous libéreront !

Contenu de l'article à venir...`,
    author: {
      name: "Cédric Famibelle-Pronzola",
      url: "https://cedric-pronzola.re"
    }
  }
];

export function getAllPosts(): BlogPostMetadata[] {
  return blogPosts.map(({ slug, title, description, date, author }) => ({
    slug,
    title,
    description,
    date,
    author
  }));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}
