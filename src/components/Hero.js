import { Link } from 'react-scroll';

const Hero = ({ basics }) => {
  return (
    <section className="text-gray-500 bg-gray-900 body-font">
      <main>
        <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex justify-center">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={basics.picture}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Hi, I am
              {` ${basics.name}`}
              <br />
              {basics.label.toUpperCase()}
            </h1>
            <p className="mb-8 leading-relaxed">{basics.summary}</p>
            <div className="flex justify-center">
              <a href="../Shubham's Resume.pdf" download="Shubham's Resume.pdf">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg umami--click--hero-download-resume">
                  Download Resume
                </button>
              </a>
              <Link to="contact" smooth duration={1000}>
                <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg umami--click--hero-contact">
                  Contact
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
