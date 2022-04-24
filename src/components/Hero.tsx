import Image from 'next/image';
import React from 'react';
import { DiagonalArrow } from './Icons';

export const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div>
        <p className="text-2xl font-medium text-skin-secondary md:text-3xl">
          Hey, I am Shubham Verma!
        </p>
        <p className="text-md mt-2 text-skin-secondary">
          Software Engineer at{' '}
          <a
            target="_blank"
            href="https://geekyants.com"
            rel="noopener noreferrer"
            className="pb-1 hover:border-b">
            <strong className="text-[#ca0000] dark:text-skin-secondary">
              GeekyAnts
              <DiagonalArrow className="inline text-xl" />
            </strong>
          </a>
        </p>
        <p className="text-md mt-3 text-skin-secondary md:text-lg">
          I like to build open source tools and write articles.
        </p>
        <div className="flex items-center">
          <a
            target="_blank"
            href="https://shbm.fyi/tw"
            className=" mt-3 mr-5 w-max pb-1 text-lg text-[#1DA1F2] hover:border-b"
            rel="noopener noreferrer">
            <strong>Twitter</strong>
            <DiagonalArrow className="inline text-xl" />
          </a>
          <a
            target="_blank"
            href="https://shbm.fyi/gh"
            className="mt-3 mr-5 w-max pb-1 text-lg text-skin-secondary hover:border-b"
            rel="noopener noreferrer">
            <strong>GitHub</strong>
            <DiagonalArrow className="inline text-xl" />
          </a>
          <a
            target="_blank"
            href="https://shbm.fyi/gh"
            className="mt-3 w-max pb-1 text-lg text-[#0a66c2] hover:border-b dark:text-[#e9e9ea]"
            rel="noopener noreferrer">
            <strong>LinkedIn</strong>
            <DiagonalArrow className="inline text-xl" />
          </a>
        </div>
      </div>
      <div className="w-max overflow-clip grayscale hover:grayscale-0 md:mr-0 md:ml-auto">
        <Image
          src="https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=879&q=80"
          alt="Shubham Verma"
          width={120}
          height={120}
          className="rounded-full"
          title="Shubham Verma"
        />
      </div>
    </div>
  );
};
