import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="mb-4">404</h1>
      <p className="text-lg text-lightText mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-white no-underline hover:text-lightText"
      >
        ← Back to home
      </Link>
    </div>
  );
}

