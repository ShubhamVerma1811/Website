import Link from 'next/link';
import { NowPlaying } from './NowPlaying';

export const Footer = () => {
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
        name: 'Colophon',
        href: '/colophon'
      }
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://shbm.fyi/gh'
      },
      {
        name: 'Twitter',
        href: 'https://shbm.fyi/tw'
      },
      {
        name: 'LinkedIn',
        href: 'https://shbm.fyi/li'
      },
      {
        name: 'Instagram',
        href: 'https://shbm.fyi/ig'
      }
    ],
    misc: [
      {
        name: 'Uses',
        href: '/uses'
      },
      {
        name: 'Books',
        href: '/books'
      },
      {
        name: 'RSS',
        href: '/rss.xml'
      },
      {
        name: 'Sitemap',
        href: '/sitemap.xml'
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
                  className='my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4'>
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
                  className='my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4'>
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
                  className='my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4'>
                  <Link href={link.href} passHref>
                    <a>{link.name} </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='container mx-auto flex flex-col items-center py-8 sm:flex-row'>
        <span
          className='title-font umami--click--footer-logo flex cursor-pointer items-center justify-center text-xl font-medium text-skin-secondary md:justify-start'
          onClick={() => {
            window?.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}>
          Shubham Verma
        </span>
        <p className='mt-4 text-sm text-skin-secondary sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:pl-4'>
          Made with{' '}
          <span role='img' aria-label='img'>
            💖
          </span>{' '}
          and NextJS © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
