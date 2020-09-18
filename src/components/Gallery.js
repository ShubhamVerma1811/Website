import shortid from 'shortid';

const Gallery = ({ projects }) => (
  <section className="text-gray-700 body-font">
    <section className="text-gray-500 body-font bg-gray-900">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
          Projects 2
        </h1>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {projects.map((project) => (
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-800 p-6 rounded-lg">
                {project.images.length > 0 &&
                  project.images.map((image) => (
                    <img
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src={image.resolutions.mobile.url}
                      alt="content"
                    />
                  ))}
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  SUBTITLE
                </h3>
                <h2 className="text-lg text-white font-medium title-font mb-4">
                  {project.displayName}
                </h2>
                <p className="leading-relaxed text-base">{project.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="text-gray-500 bg-gray-900 body-font">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
          Projects 3
        </h1>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {projects.map((project) => (
            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                {project.images.length > 0 &&
                  project.images.map((image) => (
                    <img
                      alt="content"
                      className="object-cover object-center h-full w-full"
                      src={image.resolutions.desktop.url}
                    />
                  ))}
              </div>
              <h2 className="text-xl font-medium title-font text-white mt-5">
                {project.displayName}
              </h2>
              <p className="text-base leading-relaxed mt-2">
                {project.summary}
              </p>
              <a className="text-indigo-500 inline-flex items-center mt-3">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  </section>
);

export default Gallery;
