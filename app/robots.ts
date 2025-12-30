import { MetadataRoute } from 'next';
import { siteUrl } from '@/data/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

