import Link from 'next/link';
import Image from 'next/image';
import { contact } from '@/data/config';

export default function Footer() {
  return (
    <footer className="border-t border-lightText/10 mt-auto">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-5">
            {contact.github && (
              <a
                href={`https://github.com/${contact.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-lightText hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Image
                  src="/static/icons/github.svg"
                  width={20}
                  height={20}
                  alt="GitHub"
                />
              </a>
            )}
            {contact.linkedin && (
              <a
                href={`https://linkedin.com/in/${contact.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="text-lightText hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Image
                  src="/static/icons/linkedin.svg"
                  width={20}
                  height={20}
                  alt="LinkedIn"
                />
              </a>
            )}
          </div>
          <p className="text-lightText text-sm">
            © {new Date().getFullYear()} Ibrahim Adeniyi
          </p>
        </div>
      </div>
    </footer>
  );
}

