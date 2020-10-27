import shortid from 'shortid';

const Gallery = ({ projects }) => (
  <section className="text-gray-500 bg-gray-900 body-font">
    <div className="px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
          Projects
        </h1>
      </div>
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {projects.map((project) => (
            <div
              className="p-4 lg:w-1/3 md:w-1/2 sm:mb-0 mb-6"
              key={shortid.generate()}>
              <div className="rounded-lg h-64 overflow-hidden">
                {project.images.length > 0 &&
                  project.images.map((image) => (
                    <img
                      alt="content"
                      key={shortid.generate()}
                      className="object-cover object-center h-full w-full"
                      src={image.resolutions.desktop.url}
                    />
                  ))}
              </div>
              <div>
                <h2 className="text-xl font-medium title-font text-white mt-5">
                  {project.displayName}
                </h2>
                <p className="text-base leading-relaxed mt-2">
                  {project.summary}
                </p>

                <a
                  href={project.website}
                  className="text-indigo-500 inline-flex items-center mt-3 cursor-pointer mr-6">
                  Live Demo
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <a
                  href={project.githubUrl}
                  className="text-indigo-500 inline-flex items-center mt-3 cursor-pointer">
                  GitHub Repo
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
