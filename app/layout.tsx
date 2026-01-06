import { BackToTop, Banner, Footer, Header } from 'components';
import Script from 'next/script';
import type { Person, WebSite, WithContext } from 'schema-dts';
import {
  CITY,
  COUNTRY,
  CURRENT_ORGANIZATION,
  CURRENT_TITLE,
  DOMAIN,
  GITHUB_URL,
  HIRE_MAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SPOTIFY_URL,
  TWITTER_HANDLE,
  TWITTER_URL
} from 'services/constants';
import '../src/styles/global.css';
import '../src/styles/tailwind.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const schema: WithContext<{
    '@graph': (Person | WebSite)[];
  }> = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${DOMAIN}#person`,
        name: 'Shubham Verma',
        url: DOMAIN,
        email: HIRE_MAIL,
        jobTitle: CURRENT_TITLE,
        worksFor: {
          '@type': 'Organization',
          name: CURRENT_ORGANIZATION
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: CITY,
          addressCountry: COUNTRY
        },
        sameAs: [
          TWITTER_URL,
          LINKEDIN_URL,
          GITHUB_URL,
          INSTAGRAM_URL,
          SPOTIFY_URL
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${DOMAIN}#website`,
        url: DOMAIN,
        name: 'Shubham Verma',
        publisher: {
          '@id': `${DOMAIN}#person`
        },
        inLanguage: 'en',
        description:
          'Personal website of Shubham Verma, a software engineer and tech enthusiast.'
      }
    ]
  };

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
        <meta name='application-name' content='Shubham Verma' />
        <meta name='theme-color' content='#000000' />
        <meta property='og:site_name' content='Shubham Verma' />
        <meta property='og:locale' content='en_US' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content={TWITTER_HANDLE} />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='alternate'
          type='application/rss+xml'
          title='Blogs by Shubham Verma'
          href='/rss.xml'
        />
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_UUID}
          src={process.env.NEXT_PUBLIC_UMAMI_URI}
          data-do-not-track='true'
        />
        <Script
          id='site-schema'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className='dark bg-skin-primary'>
        <Banner />
        <div className='mx-5 flex h-[100dvh] max-w-4xl flex-col sm:mx-12 md:mx-32 lg:mx-auto '>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
