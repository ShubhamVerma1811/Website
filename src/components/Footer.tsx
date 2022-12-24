import { useAtom } from 'jotai';
import Image from 'next/future/image';
import Link from 'next/link';
import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL
} from 'services/constants';
import { isDarkModeAtom } from 'store/atoms/theme';
import { NowPlaying } from './NowPlaying';

export const Footer = () => {
  const [isDarkMode] = useAtom(isDarkModeAtom);
  const footerLinks = {
    site: [
      {
        name: 'Home',
        href: '/'
      },
      {
        name: 'Blog',
        href: '/blog'
      },
      {
        name: 'Resume',
        href: '/resume'
      },
      {
        name: 'Colophon',
        href: '/colophon'
      },
      {
        name: 'Socials',
        href: '/socials'
      }
    ],
    social: [
      {
        name: 'GitHub',
        href: GITHUB_URL
      },
      {
        name: 'Twitter',
        href: TWITTER_URL
      },
      {
        name: 'LinkedIn',
        href: LINKEDIN_URL
      },
      {
        name: 'Instagram',
        href: INSTAGRAM_URL
      }
    ],
    misc: [
      {
        name: 'Uses',
        href: '/uses'
      },
      {
        name: 'Books',
        href: '/books',
        csr: true
      },
      {
        name: 'RSS',
        href: '/rss.xml',
        csr: true
      },
      {
        name: 'Sitemap',
        href: '/sitemap.xml',
        csr: true
      }
    ]
  };

  return (
    <footer className='body-font mt-4 bg-skin-primary'>
      <hr className='my-4 border-skin-primary-muted' />

      <NowPlaying />

      <hr className='my-4 border-skin-primary-muted' />

      <div className='flex flex-col md:flex-row md:justify-between'>
        <div>
          <ul>
            {footerLinks.site.map((link, index) => {
              return (
                <li
                  key={index}
                  className={`my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4 umami--click--footer-${link.name}`}>
                  <Link href={link.href} passHref>
                    <a>{link.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <ul>
            {footerLinks.social.map((link, index) => {
              return (
                <li
                  key={index}
                  className={`my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4 umami--click--footer-${link.name}`}>
                  <Link href={link.href} passHref>
                    <a target='_blank' rel='noopener noreferrer'>
                      {link.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <ul>
            {footerLinks.misc.map((link, index) => {
              return (
                <li
                  key={index}
                  className={`my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4 umami--click--footer-${link.name}`}>
                  {link.csr ? (
                    <a
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'>
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} passHref>
                      <a>{link.name} </a>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};
