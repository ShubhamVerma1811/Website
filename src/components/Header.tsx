import { GithubIcon, LinkedInIcon, TwitterIcon } from 'components/Icons';
import Link from 'next/link';
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from 'services/constants';
import ThemeToggler from './ThemeToggler';

export const Header = () => {
  const headerLinks = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Blog',
      href: '/blog'
    },
    {
      name: 'Work',
      href: '/work'
    }
  ];

  return (
    <header className='my-4 mb-12 rounded-md bg-skin-primary' id='header'>
      <nav className='flex items-center'>
        <div>
          {headerLinks.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                passHref
                className={`text-md mr-2 cursor-pointer rounded-md bg-skin-primary p-2 text-skin-secondary transition-all hover:bg-skin-secondary-muted md:text-xl  umami--click--header-${link.name} `}>
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className='ml-auto'>
          <div className='flex flex-wrap items-center'>
            <a
              target='_blank'
              href={TWITTER_URL}
              className=' umami--click--hero-twitter mr-1 w-max rounded-md p-2 text-lg text-[#1DA1F2] hover:bg-skin-secondary-muted'
              rel='noopener noreferrer'>
              <TwitterIcon />
            </a>
            <a
              target='_blank'
              href={GITHUB_URL}
              className='umami--click--hero-github mr-1 w-max rounded-md p-2 text-lg text-skin-secondary hover:bg-skin-secondary-muted'
              rel='noopener noreferrer'>
              <GithubIcon />
            </a>
            <a
              target='_blank'
              href={LINKEDIN_URL}
              className='umami--click--hero-linkedin w-max rounded-md p-2 text-lg text-[#0a66c2] hover:bg-skin-secondary-muted dark:text-[#ffffffe6]'
              rel='noopener noreferrer'>
              <LinkedInIcon />
            </a>
            <ThemeToggler />
          </div>
        </div>
      </nav>
    </header>
  );
};
