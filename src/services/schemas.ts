import type { BreadcrumbList, Person, WebSite, WithContext } from 'schema-dts';
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
  TWITTER_URL
} from './constants';

export const getBreadcrumbs = (): WithContext<BreadcrumbList> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: DOMAIN
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${DOMAIN}/blog`
    }
  ]
});

export const personSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
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
  sameAs: [TWITTER_URL, LINKEDIN_URL, GITHUB_URL, INSTAGRAM_URL, SPOTIFY_URL]
};

export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
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
};
