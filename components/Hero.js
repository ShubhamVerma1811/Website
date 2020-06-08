import { Link } from "react-scroll";

const Hero = ({ basics }) => {
  return (
    <section className="text-gray-700 body-font">
      <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={basics.picture}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Hi, I am
            {` ${basics.name}`}
            <br />
            {basics.label.toUpperCase()}
          </h1>
          <p className="mb-8 leading-relaxed">
            I am a Front End Developer with knowledge of HTML, CSS, JS and
            React. I have been learning Back End Development and tinkering with
            Competitive Programming.
          </p>
          <div className="flex justify-center">
            <a href="../resume.pdf" download="Resume-Shubham Verma.pdf">
              <button
                type="submit"
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Download Resume
              </button>
            </a>
            <Link to="contact" smooth duration={1000}>
              <button
                type="submit"
                className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
              >
                Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
