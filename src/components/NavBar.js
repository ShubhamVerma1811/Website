import React from 'react';

const NavBar = () => (
  <div>
    <nav className="flex items-center justify-between bg-teal-300 flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          src="https://cdn.dribbble.com/users/1222918/screenshots/4495723/s1d.jpg"
          alt="logo"
          className="h-12"
        />
      </div>
      <div className="block lg:hidden">
        <button
          type="submit"
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </nav>
  </div>
);

export default NavBar;
