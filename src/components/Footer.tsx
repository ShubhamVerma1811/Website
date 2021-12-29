import { Link } from 'react-scroll';
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-500 bg-gray-900 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link
          to="header"
          smooth
          duration={1000}
          className="flex title-font font-medium items-center md:justify-start justify-center text-white umami--click--footer-logo cursor-pointer">
          <span className="ml-3 text-xl">Shubham Verma</span>
        </Link>
        <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          Made with{' '}
          <span role="img" aria-label="img">
            🤍
          </span>{' '}
          and NextJS © 2021
        </p>
      </div>
    </footer>
  );
};

export default Footer;
