import { notFound } from 'next/navigation';
import { getPostRaw } from '@/lib/blog';
import PostEditor from '../../post-editor';
import DevelopmentOnly from '@/components/admin/DevelopmentOnly';

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = await getPostRaw(slug);

  if (!post) {
    notFound();
  }

  return (
    <DevelopmentOnly>
      <div>
        <h2 className="text-xl font-semibold mb-6">Edit Post: {post.title}</h2>
        <PostEditor initialData={post} isEditing />
      </div>
    </DevelopmentOnly>
  );
}
