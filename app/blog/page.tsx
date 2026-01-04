import { getBlogPosts, getAllTags } from '@/lib/blog';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Writing',
  description:
    'Thoughts on software development, personal stuff, programming, and technology.',
  openGraph: {
    title: 'Writing | Ibrahim Adeniyi',
    description: 'Thoughts on software development, personal stuff, programming, and technology.',
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const allTags = getAllTags();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="mb-4">Writing</h1>
      <p className="text-lg text-lightText mb-12">
        Thoughts on software development, personal stuff, programming, and technology.
      </p>

      <BlogList posts={posts} allTags={allTags} />
    </div>
  );
}
