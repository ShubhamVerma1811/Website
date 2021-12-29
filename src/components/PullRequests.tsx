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
    <section className="text-gray-400 body-font bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
            Open Source Contributions
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {PRs.map((pr) => {
            return (
              <div className="xl:w-1/3 md:w-1/2 p-4 w-full" key={pr.id}>
                <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg overflow-hidden">
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium title-font mb-2 flex-1 truncate">
                      <a
                        href={pr?.repository?.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        Repo:{' '}
                        <span className="text-white">
                          {pr?.repository?.name}
                        </span>
                      </a>
                    </h2>
                    <h2 className="text-lg  font-medium title-font mb-2 truncate ">
                      Status:
                      <span className="text-white"> {pr?.state}</span>
                    </h2>
                  </div>
                  <h2 className="text-lg  font-medium title-font mb-2 truncate ">
                    Title:
                    <span className="text-white"> {pr?.title}</span>
                  </h2>
                  <p className="leading-relaxed text-base truncate overflow-hidden ">
                    Body:{' '}
                    <span className="text-white">
                      {pr?.body ? pr?.body : 'No body found'}
                    </span>
                  </p>
                  <a
                    className="text-indigo-400 inline-flex items-center mt-4
                      hover:underline
                      "
                    href={pr?.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    View the PR
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
            );
          })}
        </div>
      </div>
      <LoadMoreButton hasMore={hasMore} loadMore={loadMore} />
    </section>
  );
};

export default PullRequests;
