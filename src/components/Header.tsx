import Link from 'next/link';
import { IProfile } from '../types';
import React from 'react';

interface HeaderProps {
  profiles: IProfile[];
}

const Header = ({ profiles }: HeaderProps) => {
  return (
    <header className="text-gray-500 bg-gray-900 body-font" id="header">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center cursor-pointer">
        <Link href="/">
          <span className="flex title-font font-medium items-center text-white mb-4 md:mb-0 umami--click--nav-logo ml-3 text-xl">
            Shubham Verma
          </span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {profiles?.map((profile, index) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={profile.url}
              key={index}
              className={`mr-5 hover:text-white cursor-pointer umami--click--nav-${profile.network}-link`}>
              {profile.network}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
