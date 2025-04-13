import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2025-04-13');

  return [
    // Home
    { url: 'https://cedric-pronzola.dev', lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: 'https://cedric-pronzola.dev/en', lastModified, changeFrequency: 'monthly', priority: 1 },

    // Blog root
    { url: 'https://cedric-pronzola.dev/blog', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://cedric-pronzola.dev/en/blog', lastModified, changeFrequency: 'weekly', priority: 0.8 },

    // Articles FR
    {
      url: 'https://cedric-pronzola.dev/blog/l-assimilation-forcee-et-l-eradication-de-la-culture-locale',
      lastModified: new Date('2025-04-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://cedric-pronzola.dev/blog/l-independance-de-la-reunion',
      lastModified: new Date('2025-01-29'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://cedric-pronzola.dev/blog/les-logiciels-libres-nous-libereront',
      lastModified: new Date('2024-12-08'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },

    // Articles EN
    {
      url: 'https://cedric-pronzola.dev/en/blog/forced-assimilation-and-eradication-of-local-culture',
      lastModified: new Date('2025-04-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://cedric-pronzola.dev/en/blog/reunion-independence',
      lastModified: new Date('2025-01-29'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://cedric-pronzola.dev/en/blog/free-software-will-liberate-us',
      lastModified: new Date('2024-12-08'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
