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
    <section className="body-font bg-gray-900 text-gray-500">
      <div className="mx-auto px-5 py-24">
        <div className="mb-12 flex w-full flex-col text-center">
          <h1 className="title-font text-2xl font-medium text-white sm:text-3xl">
            Projects
          </h1>
        </div>
        <div className="container mx-auto px-5">
          <div className="-mx-4 -mb-10 -mt-4 flex flex-wrap sm:-m-4">
            {projects?.map((project) => (
              <div className="mb-6 p-4 sm:mb-0 md:w-1/2 lg:w-1/3">
                <div className="h-auto overflow-hidden rounded-lg">
                  {project?.images?.length > 0 &&
                    project?.images?.map((image) => (
                      <img
                        alt="content"
                        className="h-full w-full object-cover object-center"
                        src={image?.resolutions?.desktop.url}
                      />
                    ))}
                </div>
                <div>
                  <h2 className="title-font mt-5 text-xl font-medium text-white">
                    {project?.displayName}
                  </h2>
                  <div className="flex items-center">
                    <p className="mr-1">Stack: </p>
                    {project?.libraries?.length
                      ? project?.libraries?.map((lib, idx) => (
                          <p
                            className="mr-1 rounded-xl bg-indigo-500 px-2 py-1 text-white"
                            key={idx}
                          >
                            {lib}
                          </p>
                        ))
                      : project?.languages?.map((lang, idx) => (
                          <p
                            className="mr-1 rounded-xl bg-indigo-500 px-2 py-1 text-white"
                            key={idx}
                          >
                            {lang}
                          </p>
                        ))}
                  </div>
                  <p className="mt-2 text-base leading-relaxed">
                    {project.summary}
                  </p>

                  {project.website && (
                    <span
                      className={`umami--click-${project.displayName}-live`}
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={project.website}
                        className={`mt-3 mr-6 inline-flex cursor-pointer items-center text-indigo-500 `}
                      >
                        Live Demo
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="ml-2 h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </span>
                  )}
                  {project.githubUrl && (
                    <span
                      className={`umami--click-${project.displayName}-github`}
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={project.githubUrl}
                        className={`mt-3 inline-flex cursor-pointer items-center text-indigo-500 `}
                      >
                        GitHub Repo
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="ml-2 h-4 w-4"
                          viewBox="0 0 24 24"
                        >
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
