import Link from 'next/link';

export default function Navigation() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Writing' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <nav className="border-b border-lightText/10">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/" className="text-white font-semibold text-lg no-underline">
            Ibrahim Adeniyi
          </Link>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lightText no-underline hover:text-white transition-colors text-sm sm:text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

