import type { Metadata } from 'next';
import { DOMAIN, TWITTER_HANDLE } from 'services/constants';

export function generateMetaData({
  title,
  description
}: {
  title: string;
  description?: string;
}): Metadata {
  return {
    metadataBase: new URL(DOMAIN),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      images: [
        {
          url: `${DOMAIN}/api/og?title=${title}&desc=${description}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER_HANDLE,
      title: title,
      description: description,
      images: [`${DOMAIN}/api/og?title=${title}&desc=${description}`]
    }
  };
}
