import shortid from 'shortid';

const Gallery = ({ projects }) => (
  <section className="text-gray-700 body-font">
    <div className="container px-5 py-12 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Projects
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Here is the showcase of some of my featured projects.
        </p>
      </div>
      <div className="flex flex-wrap -m-4">
        {projects.map((project) => (
          <div key={shortid.generate()} className="lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex relative">
              {project.images.length > 0 &&
                project.images.map((image) => (
                  <img
                    key={shortid.generate()}
                    alt="gallery"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src={image.resolutions.desktop.url}
                    loading="lazy"
                  />
                ))}
              <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                  {project.name}
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  {project.displayName}
                </h1>
                <p className="leading-relaxed">{project.summary}</p>
                <div className="flex">
                  <div>
                    <p className="text-indigo-500">Languages Used : </p>
                    {project.languages.map((lang) => (
                      <p
                        key={shortid.generate()}
                        className="leading-relaxed inline pr-3"
                      >
                        {lang}
                      </p>
                    ))}
                  </div>
                  {project.libraries.length > 0 && (
                    <div>
                      <p className="text-indigo-500">Libraries Used : </p>
                      {project.libraries.map((lib) => (
                        <p
                          key={shortid.generate()}
                          className="leading-relaxed inline pr-4"
                        >
                          {lib}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-start items-center">
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <button
                      className="inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-500 hover:text-white rounded text-lg"
                      type="button"
                    >
                      Live Demo
                    </button>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ml-4"
                  >
                    <button
                      type="button"
                      className="inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-2 focus:outline-none hover:bg-gray-300 rounded text-lg hover:bg-indigo-500 hover:text-white"
                    >
                      GitHub Repo
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
