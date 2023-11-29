import Link from 'next/link';
import { NowPlaying } from './NowPlaying';

export const Footer = () => {
  const footerLinks = {
    site: [
      {
        name: 'Work',
        href: '/work'
      },
      {
        name: 'Craft',
        href: '/craft'
      },
      {
        name: 'Socials',
        href: '/socials'
      },
      {
        name: 'Spotify',
        href: '/spotify'
      },
      {
        name: 'RSS',
        href: '/rss.xml'
      }
    ]
  };

  return (
    <footer className='body-font mt-4 bg-skin-primary'>
      <hr className='my-4 border-skin-primary-muted' />

      <NowPlaying />

      <hr className='my-4 border-skin-primary-muted' />

      <ul className='flex flex-row gap-4'>
        {footerLinks.site.map((link, index) => {
          return (
            <li
              key={index}
              className={`my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4 umami--click--footer-${link.name}`}>
              <Link href={link.href} passHref>
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};
