import { useAtom } from 'jotai';
import Image from 'next/future/image';
import Link from 'next/link';
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
        <p className='text-md mt-4 text-skin-secondary sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:pl-4'>
          Built with{' '}
          <Image
            className='mx-1 inline'
            src={`/assets/logos/next/${isDarkMode ? 'dark.svg' : 'light.svg'}`}
            alt='Next.js Logo'
            title='Next.js'
            width={20}
            height={20}
          />
          <Image
            className='mx-1 inline'
            src={`/assets/logos/tailwind/logo.svg`}
            alt='Tailwind CSS Logo'
            title='Tailwind CSS'
            width={20}
            height={20}
          />
          <Image
            className='mx-1 inline'
            src={`/assets/logos/sanity/logo.svg`}
            alt='Sanity Logo'
            title='Sanity'
            width={20}
            height={20}
          />
          <Image
            className='mx-1 inline'
            src={`/assets/logos/vercel/${
              isDarkMode ? 'light.svg' : 'dark.svg'
            }`}
            alt='Vercel Logo'
            title='Vercel'
            width={20}
            height={20}
          />
          and{' '}
          <span role='img' aria-label='img'>
            💛
          </span>
        </p>
      </div>
    </footer>
  );
};
