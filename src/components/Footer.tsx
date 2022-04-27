import Link from 'next/link';
import React from 'react';
import { NowPlaying } from './NowPlaying';

export const Footer = () => {
  const footerLinks = {
    site: [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'Blog',
        href: '/blog',
      },
      {
        name: 'Colophon',
        href: '/colophon',
      },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://shbm.fyi/gh',
      },
      {
        name: 'Twitter',
        href: 'https://shbm.fyi/tw',
      },
      {
        name: 'LinkedIn',
        href: 'https://shbm.fyi/li',
      },
      {
        name: 'Spotify',
        href: 'https://shbm.fyi/sp',
      },
    ],
    misc: [
      {
        name: 'Uses',
        href: '/uses',
      },
      {
        name: 'Books',
        href: '/books',
      },
    ],
  };

  return (
    <footer className='body-font mt-12 bg-skin-primary'>
      <hr className='my-4 border-skin-primary-muted' />

      <NowPlaying />

      <hr className='my-4 border-skin-primary-muted' />

      <div className='flex flex-col md:flex-row md:justify-between'>
        <div>
          {footerLinks.site.map((link, index) => {
            return (
              <Link href={link.href} key={index} passHref>
                <a>
                  <li className='my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4'>
                    {link.name}
                  </li>
                </a>
              </Link>
            );
          })}
        </div>
        <div>
          {footerLinks.social.map((link, index) => {
            return (
              <Link href={link.href} key={index} passHref>
                <a target='_blank' rel='noopener noreferrer'>
                  <li className='my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4'>
                    {link.name}
                  </li>
                </a>
              </Link>
            );
          })}
        </div>
        <div>
          {footerLinks.misc.map((link, index) => {
            return (
              <Link href={link.href} key={index} passHref>
                <a>
                  <li className='my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4'>
                    {link.name}{' '}
                    <span className='text-sm text-skin-primary-muted'>(soon)</span>
                  </li>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className='container mx-auto flex flex-col items-center py-8 sm:flex-row'>
        <span
          className='title-font umami--click--footer-logo flex cursor-pointer items-center justify-center text-xl font-medium text-skin-secondary md:justify-start'
          onClick={() => {
            window?.scrollTo({
              top: 0,
              behavior: 'smooth',
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
