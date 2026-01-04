import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { deletePost } from '@/app/actions/blog';
import DeletePostButton from './delete-button';

export default function BlogAdminPage() {
  const posts = getBlogPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Blog Management</h2>
        <Link 
          href="/admin/blog/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 italic">No posts found.</p>
        ) : (
          posts.map((post) => (
            <div 
              key={post.slug}
              className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div>
                <h3 className="font-medium text-lg">{post.title}</h3>
                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.slug}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/blog/edit/${post.slug}`}
                  className="text-blue-500 hover:text-blue-600 px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-500/10"
                >
                  Edit
                </Link>
                <DeletePostButton slug={post.slug} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
