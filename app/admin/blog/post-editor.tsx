'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/app/actions/blog';

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface PostEditorProps {
  initialData?: {
    title: string;
    slug: string;
    date: string;
    summary: string;
    tags: string[];
    content: string;
  };
  isEditing?: boolean;
}

export default function PostEditor({ initialData, isEditing = false }: PostEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialData?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    formData.append('content', content);
    
    try {
      let result;
      if (isEditing && initialData) {
        result = await updatePost(initialData.slug, formData);
      } else {
        result = await createPost(formData);
      }
      
      if (result && result.success) {
        router.push('/admin/blog');
        router.refresh(); // Ensure the list is updated
      } else {
        // Handle unexpected failure if any
        setIsSubmitting(false);
        alert('Failed to save the post.');
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert('An error occurred while saving the post.');
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
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
            defaultValue={initialData?.title}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="block text-sm font-medium">
            Slug (URL)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            defaultValue={initialData?.slug}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          />
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
            defaultValue={initialData?.date || new Date().toISOString().split('T')[0]}
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
            defaultValue={initialData?.tags?.join(', ')}
            placeholder="tech, web, nextjs"
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
          defaultValue={initialData?.summary}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
        />
      </div>

      <div className="space-y-2 prose dark:prose-invert max-w-none">
        <label className="block text-sm font-medium">Content (Markdown)</label>
        <SimpleMDE
          value={content}
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
