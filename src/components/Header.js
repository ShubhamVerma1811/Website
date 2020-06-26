import '../styles/tailwind.css';

const Header = ({ profiles }) => {
  return (
    <header id="nav" className="text-gray-700 body-font" id="header">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">Shubham Verma</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-evenly">
          <a
            href={profiles[1].url}
            className="mr-5 hover:text-gray-900 cursor-pointer"
          >
            GitHub
          </a>
          <a
            href={profiles[2].url}
            className="mr-5 hover:text-gray-900 cursor-pointer"
          >
            LinkedIn
          </a>
          <a
            href="https://hackerrank.com/shubhamverma18"
            className="hover:text-gray-900"
          >
            HackerRank
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
