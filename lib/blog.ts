import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  readingTime: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
}

const blogDirectory = path.join(process.cwd(), 'content/blog');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getBlogPosts(): BlogPostMeta[] {
  // Ensure directory exists
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        summary: data.summary || '',
        tags: data.tags || [],
        readingTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      content: contentHtml,
      tags: data.tags || [],
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

export async function getPostRaw(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      content: content, // Raw markdown
      tags: data.tags || [],
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getBlogPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getBlogPosts();
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function searchPosts(query: string): BlogPostMeta[] {
  const posts = getBlogPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.summary.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
