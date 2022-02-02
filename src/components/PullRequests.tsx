import { useState } from 'react';
import { useLoadMore } from '../hooks/useLoadMore';
import { IAuthorAssociation, IPullRequests } from '../types';
import LoadMoreButton from './LoadMoreButton';

interface PullRequestsProps {
  pullRequests: IPullRequests;
  filteredPRIDs: string[];
}

const PullRequests = ({ pullRequests, filteredPRIDs }: PullRequestsProps) => {
  const [_PRs] = useState(
    pullRequests?.data?.user?.pullRequests?.nodes.filter(
      (pr) =>
        pr.authorAssociation !== IAuthorAssociation.Owner &&
        !filteredPRIDs.includes(pr.id),
    ),
  );

  const {
    items: PRs,
    hasMore,
    loadMore,
  } = useLoadMore<IPullRequests['nodes']>(_PRs, 3);

  return (
    <section className="body-font bg-gray-900 text-gray-400">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-12 flex w-full flex-col flex-wrap items-center text-center">
          <h1 className="title-font text-2xl font-medium text-white sm:text-3xl">
            Open Source Contributions
          </h1>
        </div>
        <div className="-m-4 flex flex-wrap">
          {PRs.map((pr) => {
            return (
              <div className="w-full p-4 md:w-1/2 xl:w-1/3" key={pr.id}>
                <div className="overflow-hidden rounded-lg border border-gray-700 border-opacity-75 p-6">
                  <div className="flex items-center">
                    <h2 className="title-font mb-2 flex-1 truncate text-lg font-medium">
                      <a
                        href={pr?.repository?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repo:{' '}
                        <span className="text-white">
                          {pr?.repository?.name}
                        </span>
                      </a>
                    </h2>
                    <h2 className="title-font  mb-2 truncate text-lg font-medium ">
                      Status:
                      <span className="text-white"> {pr?.state}</span>
                    </h2>
                  </div>
                  <h2 className="title-font  mb-2 truncate text-lg font-medium ">
                    Title:
                    <span className="text-white"> {pr?.title}</span>
                  </h2>
                  <p className="overflow-hidden truncate text-base leading-relaxed ">
                    Body:{' '}
                    <span className="text-white">
                      {pr?.body ? pr?.body : 'No body found'}
                    </span>
                  </p>
                  <a
                    className="mt-4 inline-flex items-center text-indigo-400
                      hover:underline
                      "
                    href={pr?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the PR
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <LoadMoreButton hasMore={hasMore} loadMore={loadMore} />
    </section>
  );
};

export default PullRequests;
