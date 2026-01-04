'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const blogDirectory = path.join(process.cwd(), 'content/blog');

interface BlogPostData {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string;
  content: string;
}

function ensureDevelopementMode() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Blog management is only available in development mode.');
  }
}

function ensureDirectoryExists() {
  ensureDevelopementMode();
  if (!fs.existsSync(blogDirectory)) {
    fs.mkdirSync(blogDirectory, { recursive: true });
  }
}

export async function createPost(formData: FormData) {
  ensureDirectoryExists();
  
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const date = formData.get('date') as string;
  const summary = formData.get('summary') as string;
  const tagsStr = formData.get('tags') as string;
  const content = formData.get('content') as string;

  const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);

  const frontmatter = {
    title,
    date,
    summary,
    tags,
  };

  const fileContent = matter.stringify(content, frontmatter);
  const filePath = path.join(blogDirectory, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    throw new Error('A post with this slug already exists.');
  }

  fs.writeFileSync(filePath, fileContent, 'utf8');

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  return { success: true };
}

export async function updatePost(originalSlug: string, formData: FormData) {
  ensureDevelopementMode();
  ensureDirectoryExists();

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const date = formData.get('date') as string;
  const summary = formData.get('summary') as string;
  const tagsStr = formData.get('tags') as string;
  const content = formData.get('content') as string;

  const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);

  const frontmatter = {
    title,
    date,
    summary,
    tags,
  };

  const fileContent = matter.stringify(content, frontmatter);
  
  // If slug changed, delete old file and create new one
  if (originalSlug !== slug) {
     const oldFilePath = path.join(blogDirectory, `${originalSlug}.md`);
     if (fs.existsSync(oldFilePath)) {
       fs.unlinkSync(oldFilePath);
     }
  }

  const filePath = path.join(blogDirectory, `${slug}.md`);
  fs.writeFileSync(filePath, fileContent, 'utf8');

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/admin/blog');
  return { success: true };
}

export async function deletePost(slug: string) {
  ensureDevelopementMode();
  const filePath = path.join(blogDirectory, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  return { success: true };
}
