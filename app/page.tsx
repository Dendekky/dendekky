import Link from 'next/link';
import { contact } from '@/data/config';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      <h1 className="mb-6">Ibrahim Adeniyi</h1>

      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-lg text-lightText leading-relaxed mb-4">
          I&apos;m a senior software developer at Snjallgögn. I work on AI-powered customer 
          service tools and developer tooling. Previously, I freelanced building web 
          applications for various clients. I&apos;ve been coding for over 7 years.
        </p>
        <p className="text-lg text-lightText leading-relaxed mb-4">
          I specialize in full-stack development with React, TypeScript, and Node.js. 
          I enjoy building scalable applications and exploring new technologies that solve 
          real problems.
        </p>
        <p className="text-lg text-lightText leading-relaxed">
          Explore my{' '}
          <Link href="/projects">projects</Link>, or follow me online. View my{' '}
          <Link href="/resume">resume</Link> if you&apos;re interested in working together.
        </p>
      </div>

      <section>
        <p className="text-lightText">
          Shoot me an email:{' '}
          <a href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </p>
        <p className="text-lightText mt-4">
          Read some of my articles on{' '}
          <a
            href="https://dev.to/dendekky"
            target="_blank"
            rel="noreferrer"
          >
            dev.to
          </a>
        </p>
      </section>
    </div>
  );
}

