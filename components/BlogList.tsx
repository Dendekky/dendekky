'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';

interface BlogListProps {
  posts: BlogPostMeta[];
  allTags: string[];
}

export default function BlogList({ posts, allTags }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === null ||
        post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-dark border border-lightText/20 rounded-lg px-4 py-3 text-white placeholder-lightText/50 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              selectedTag === null
                ? 'bg-white text-dark'
                : 'bg-lightText/10 text-lightText hover:bg-lightText/20'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                selectedTag === tag
                  ? 'bg-white text-dark'
                  : 'bg-lightText/10 text-lightText hover:bg-lightText/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <p className="text-lightText">No articles found.</p>
      ) : (
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-lightText/10 pb-8 last:border-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block group no-underline"
              >
                <h2 className="text-xl font-semibold text-white group-hover:text-lightText transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center gap-4 text-sm text-lightText/70 mb-3">
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
              <p className="text-lightText mb-3">{post.summary}</p>
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
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
