import { useAtom } from 'jotai';
import { useKBar } from 'kbar';
import Link from 'next/link';
import React from 'react';
import { isDarkModeAtom } from 'store/atoms/theme';
import { CommandIcon, Moon, Sun } from './Icons';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

  const headerLinks = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
    {
      name: 'More',
      href: '/more',
    },
  ];

  const kbar = useKBar();

  const toggleDarkMode = () => {
    const body = document.querySelector('body');
    body?.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', isDarkMode.toString());
  };

  return (
    <header className="my-4 mb-12 rounded-md bg-skin-primary" id="header">
      <nav className="flex">
        <div>
          {headerLinks.map((link, index) => {
            return (
              <Link key={index} href={link.href} passHref>
                <a className="mr-2 cursor-pointer rounded-md bg-skin-primary p-2 text-xl text-skin-secondary transition-all hover:bg-skin-primary-muted">
                  {link.name}
                </a>
              </Link>
            );
          })}
        </div>
        <div className="ml-auto">
          <button
            role="button"
            aria-label="Toggle Command Bar"
            className="mr-2 rounded-md border-2 border-skin-secondary bg-skin-primary p-2 hover:transition-all"
            onClick={() => {
              kbar.query.toggle();
            }}>
            <CommandIcon />
          </button>
          <button
            role="button"
            aria-label="Toggle dark mode"
            className="rounded-md border-2 border-skin-secondary bg-skin-primary p-2 hover:transition-all"
            onClick={() => {
              toggleDarkMode();
            }}>
            {isDarkMode ? <Moon /> : <Sun />}
          </button>
        </div>
      </nav>
    </header>
  );
};
