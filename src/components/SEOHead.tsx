import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'Quiz';
  jsonLd?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  image = '/og-image.jpg', 
  url = 'https://fandom-trivia.vercel.app', 
  type = 'website',
  jsonLd
}) => {
  const fullTitle = `${title} | Fandom Trivia`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook/LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
