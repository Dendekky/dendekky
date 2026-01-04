import { getBlogPosts, getBlogPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} | Ibrahim Adeniyi`,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: ['Ibrahim Adeniyi'],
      tags: post.tags,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-lightText hover:text-white transition-colors mb-8 no-underline"
      >
        ← Back to writing
      </Link>

      <header className="mb-8">
        {post.heroImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        )}
        <h1 className="mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-lightText/70 mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-lightText/70 bg-lightText/10 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose prose-invert max-w-none
          prose-headings:text-white prose-headings:font-semibold
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-lightText prose-p:leading-relaxed
          prose-a:text-white prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-lightText
          prose-strong:text-white
          prose-code:text-white prose-code:bg-lightText/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-lightText/5 prose-pre:border prose-pre:border-lightText/10 prose-pre:rounded-lg
          prose-ul:text-lightText prose-ol:text-lightText
          prose-li:marker:text-lightText/50
          prose-blockquote:border-l-lightText/30 prose-blockquote:text-lightText/80"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-12 pt-8 border-t border-lightText/10">
        <Link
          href="/blog"
          className="text-lightText hover:text-white transition-colors no-underline"
        >
          ← Back to all articles
        </Link>
      </div>
    </article>
  );
}
