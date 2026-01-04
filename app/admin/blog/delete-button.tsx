'use client';

import { deletePost } from '@/app/actions/blog';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function DeletePostButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return;

    startTransition(async () => {
      try {
        await deletePost(slug);
        router.refresh();
      } catch (error) {
        console.error(error);
        alert('Failed to delete post');
      }
    });
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-600 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
