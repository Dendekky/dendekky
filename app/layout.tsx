import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { siteUrl, meta, contact } from '@/data/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: meta.title,
    template: '%s | Ibrahim Adeniyi',
  },
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: 'Ibrahim Adeniyi', url: siteUrl }],
  creator: 'Ibrahim Adeniyi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ibrahim Adeniyi',
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: '/static/profile.png',
        width: 800,
        height: 800,
        alt: 'Ibrahim Adeniyi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: ['/static/profile.png'],
    creator: `@${contact.github}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification tokens here when you have them
    // google: 'your-google-verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd type="Person" />
        <JsonLd type="WebSite" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

