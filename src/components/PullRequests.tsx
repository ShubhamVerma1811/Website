import { useState } from 'react';
import { IAuthorAssociation, IPullRequests } from '../types';
import React from 'react';

interface PullRequestsProps {
  pullRequests: IPullRequests;
}

const PullRequests = ({ pullRequests }: PullRequestsProps) => {
  const [PRs] = useState(
    pullRequests?.data?.user?.pullRequests?.nodes.slice(0, 6),
  );

  // const [length] = useState(6);

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
            if (pr.authorAssociation === IAuthorAssociation.Owner) return null;

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
                      State:
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
      {/* <div className="flex items-center justify-center w-max">
        <span className="flex items-center">
          <button
            className="flex mx-auto mr-4  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => {
              setPRs(
                pullRequests?.data?.user?.pullRequests?.nodes.slice(length, 1),
              );
            }}>
            Prev
          </button>
          <button
            className="flex mx-auto  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => {
              setPRs(
                pullRequests?.data?.user?.pullRequests?.nodes.slice(length, 1),
              );
            }}>
            Next
          </button>
        </span>
      </div> */}
    </section>
  );
};

export default PullRequests;
