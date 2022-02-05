import Link from 'next/link';
import React from 'react';
import { IProfile } from '../types';

interface HeaderProps {
  profiles: IProfile[];
}

const Header = ({ profiles }: HeaderProps) => {
  return (
    <header className="body-font bg-gray-900 text-gray-500" id="header">
      <div className="container mx-auto flex cursor-pointer flex-col flex-wrap items-center p-5 md:flex-row">
        <Link href="/">
          <span className="title-font umami--click--nav-logo mb-4 ml-3 flex items-center text-xl font-medium text-white md:mb-0">
            Shubham Verma
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          {profiles?.map((profile, index) => (
            <Link href={profile.url} key={index}>
              <a
                className={`mr-5 cursor-pointer hover:text-white umami--click--nav-${profile.network}-link`}>
                {profile.network}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
