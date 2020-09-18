const Header = ({ profiles }) => {
  return (
    <header className="text-gray-500 bg-gray-900 body-font" id="header">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          href="#"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0 umami--click--nav-logo"
        >
          <span className="ml-3 text-xl">Shubham Verma</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a
            href={profiles[1].url}
            className="mr-5 hover:text-white cursor-pointer umami--click--nav-github-link"
          >
            GitHub
          </a>
          <a
            href={profiles[2].url}
            className="mr-5 hover:text-white cursor-pointer umami--click--nav-linkedin-link"
          >
            LinkedIn
          </a>
          <a
            href={profiles[3].url}
            className="mr-5 hover:text-white cursor-pointer umami--click--nav-hackerrank-link"
          >
            HackerRank
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
