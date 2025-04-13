import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cedric-pronzola.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://cedric-pronzola.dev/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://cedric-pronzola.dev/blog/avantages-logiciel-libre-developpement-web',
      lastModified: new Date('2023-03-15'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://cedric-pronzola.dev/blog/optimiser-performances-application-nextjs',
      lastModified: new Date('2023-01-22'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://cedric-pronzola.dev/blog/introduction-deno-alternative-nodejs',
      lastModified: new Date('2022-12-10'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://cedric-pronzola.dev/blog/animations-fluides-framer-motion',
      lastModified: new Date('2022-11-05'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
