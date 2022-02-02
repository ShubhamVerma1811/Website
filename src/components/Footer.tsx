import React from 'react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="body-font bg-gray-900 text-gray-500">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
        <Link
          to="header"
          smooth
          duration={1000}
          className="title-font umami--click--footer-logo flex cursor-pointer items-center justify-center font-medium text-white md:justify-start"
        >
          <span className="ml-3 text-xl">Shubham Verma</span>
        </Link>
        <p className="mt-4 text-sm text-gray-600 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:pl-4">
          Made with{' '}
          <span role="img" aria-label="img">
            🤍
          </span>{' '}
          and NextJS © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
