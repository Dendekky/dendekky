import { MetadataRoute } from 'next';
import { siteUrl } from '@/data/config';
import { getBlogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/projects', '/resume', '/blog'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const posts = getBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}

