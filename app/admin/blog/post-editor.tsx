'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/app/actions/blog';

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface FormState {
  title: string;
  slug: string;
  date: string;
  tags: string;
  summary: string;
  heroImage: string;
  content: string;
}

interface PostEditorProps {
  initialData?: {
    title: string;
    slug: string;
    date: string;
    summary: string;
    tags: string[];
    content: string;
    heroImage?: string;
  };
  isEditing?: boolean;
}

export default function PostEditor({ initialData, isEditing = false }: PostEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    tags: initialData?.tags?.join(', ') || '',
    summary: initialData?.summary || '',
    heroImage: initialData?.heroImage || '',
    content: initialData?.content || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData?.slug);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const onChange = useCallback((value: string) => {
    setForm(prev => ({ ...prev, content: value }));
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isSlugManuallyEdited && !isEditing) {
      const newSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setForm(prev => ({ ...prev, title: value, slug: newSlug }));
    } else {
      updateField('title', value);
    }
  };

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.set('content', form.content);
    formData.set('slug', form.slug);
    
    try {
      let result;
      if (isEditing && initialData) {
        result = await updatePost(initialData.slug, formData);
      } else {
        result = await createPost(formData);
      }
      
      if (result && result.success) {
        router.push('/admin/blog');
        router.refresh();
      } else {
        setIsSubmitting(false);
        setError('Failed to save the post.');
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'An error occurred while saving the post.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-300">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={form.title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="block text-sm font-medium">
            Slug (URL)
          </label>
          <div className="flex gap-2">
             <input
              type="text"
              id="slug"
              name="slug"
              required
              value={form.slug}
              onChange={(e) => {
                updateField('slug', e.target.value);
                setIsSlugManuallyEdited(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
            />
            <button
               type="button"
               onClick={() => {
                 const newSlug = form.title
                   .toLowerCase()
                   .replace(/[^a-z0-9]+/g, '-')
                   .replace(/(^-|-$)+/g, '');
                 updateField('slug', newSlug);
                 setIsSlugManuallyEdited(false);
               }}
               className="p-2 text-gray-500 hover:text-blue-500 border border-gray-300 dark:border-gray-700 rounded-md"
               title="Regenerate from title"
            >
              ↺
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium">
            Date (YYYY-MM-DD)
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={form.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={form.tags}
            onChange={(e) => updateField('tags', e.target.value)}
            placeholder="tech, web, nextjs"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <label htmlFor="heroImage" className="block text-sm font-medium">
            Hero Image URL (Optional)
          </label>
          <input
            type="text"
            id="heroImage"
            name="heroImage"
            value={form.heroImage}
            onChange={(e) => updateField('heroImage', e.target.value)}
            placeholder="/images/blog/my-image.jpg"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="summary" className="block text-sm font-medium">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={3}
          value={form.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
        />
      </div>

      <div className="space-y-2 prose dark:prose-invert max-w-none">
        <label className="block text-sm font-medium">Content (Markdown)</label>
        <SimpleMDE
          value={form.content}
          onChange={onChange}
          options={autofocusNoSpellcheckerOptions}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
