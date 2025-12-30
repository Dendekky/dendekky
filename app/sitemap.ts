import { MetadataRoute } from 'next';
import { siteUrl } from '@/data/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/projects', '/resume'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add blog posts here when you have them
  // const posts = getBlogPosts();
  // const blogRoutes = posts.map((post) => ({
  //   url: `${siteUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  return [...routes];
}

