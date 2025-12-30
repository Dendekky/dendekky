import { siteUrl, contact } from '@/data/config';

interface JsonLdProps {
  type?: 'Person' | 'WebSite' | 'Article';
  data?: Record<string, unknown>;
}

export function JsonLd({ type = 'Person', data }: JsonLdProps) {
  const basePersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ibrahim Adeniyi',
    url: siteUrl,
    image: `${siteUrl}/static/profile.png`,
    jobTitle: 'Senior Software Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Snjallgögn',
    },
    sameAs: [
      `https://github.com/${contact.github}`,
      `https://linkedin.com/in/${contact.linkedin}`,
      'https://dev.to/dendekky',
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'Node.js',
      'Full Stack Development',
      'Web Development',
      'AI',
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ibrahim Adeniyi',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Ibrahim Adeniyi',
    },
  };

  const schemas: Record<string, object> = {
    Person: basePersonSchema,
    WebSite: webSiteSchema,
    Article: data || {},
  };

  const schema = schemas[type] || basePersonSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

