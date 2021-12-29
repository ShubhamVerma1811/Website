import shortid from 'shortid';
import { useLoadMore } from '../hooks/useLoadMore';
import { IProject } from '../types';
import LoadMoreButton from './LoadMoreButton';

interface GalleryProps {
  projects: IProject[];
}

const Gallery = ({ projects: _projects }: GalleryProps) => {
  const {
    items: projects,
    hasMore,
    loadMore,
  } = useLoadMore<IProject[]>(_projects, 3);

  return (
    <section className="text-gray-500 bg-gray-900 body-font">
      <div className="px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
            Projects
          </h1>
        </div>
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {projects?.map((project) => (
              <div
                className="p-4 lg:w-1/3 md:w-1/2 sm:mb-0 mb-6"
                key={shortid.generate()}>
                <div className="rounded-lg h-auto overflow-hidden">
                  {project?.images?.length > 0 &&
                    project?.images?.map((image) => (
                      <img
                        alt="content"
                        key={shortid.generate()}
                        className="object-cover object-center h-full w-full"
                        src={image?.resolutions?.desktop.url}
                      />
                    ))}
                </div>
                <div>
                  <h2 className="text-xl font-medium title-font text-white mt-5">
                    {project?.displayName}
                  </h2>
                  <div className="flex items-center">
                    <p className="mr-1">Stack: </p>
                    {project?.libraries?.length
                      ? project?.libraries?.map((lib, idx) => (
                          <p
                            className="text-white px-2 py-1 bg-indigo-500 mr-1 rounded-xl"
                            key={idx}>
                            {lib}
                          </p>
                        ))
                      : project?.languages?.map((lang, idx) => (
                          <p
                            className="text-white px-2 py-1 bg-indigo-500 mr-1 rounded-xl"
                            key={idx}>
                            {lang}
                          </p>
                        ))}
                  </div>
                  <p className="text-base leading-relaxed mt-2">
                    {project.summary}
                  </p>

                  {project.website && (
                    <span
                      className={`umami--click-${project.displayName}-live`}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={project.website}
                        className={`text-indigo-500 inline-flex items-center mt-3 cursor-pointer mr-6 `}>
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
                    </span>
                  )}
                  {project.githubUrl && (
                    <span
                      className={`umami--click-${project.displayName}-github`}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={project.githubUrl}
                        className={`text-indigo-500 inline-flex items-center mt-3 cursor-pointer `}>
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
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LoadMoreButton hasMore={hasMore} loadMore={loadMore} />
    </section>
  );
};

export default Gallery;
