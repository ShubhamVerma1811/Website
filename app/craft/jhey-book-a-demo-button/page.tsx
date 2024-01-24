'use client';

import { DiagonalArrow } from 'components';
import { MetaLayout } from 'layouts/MetaLayout';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className='jhey-container'>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Jhey's Book A Demo Button
      </p>
      <MetaLayout title={`Jhey's Book Me Button | Craft`} />
      <div className='mx-auto my-16 flex flex-row justify-center select-none'>
        <button
          className='select-none font-secondary font-bold cursor-pointer relative h-[70px] w-64 text-skin-primary text-2xl pl-[60px] rounded-[10px] border-4 border-solid border-black dark:border-white bg-skin-secondary'
          type='button'>
          <span className='select-none absolute w-[60px] h-[62px] bg-[#d2ff4d] shadow-[0_10px_10px_-5px_#00000033] transition-[width] duration-[0.2s] ease-[ease-in-out] bg-no-repeat bg-center rounded-md left-0 top-0 container'>
            <span className='select-none animate-[fly_0.7s_infinite] l absolute left-1.5 top-1.5 inset-0 mask mask-url[/assets/images/chev.webp]' />
          </span>
          Book A Demo!
        </button>
      </div>
      <p className='text-skin-secondary text-xl mt-4'>
        This was my attempt at recreating this{' '}
        <Link
          href='https://twitter.com/jh3yy/status/1748048227751100918'
          target='_blank'
          rel='noopener noreferrer'
          className='inline underline underline-offset-4'>
          tweet
          <DiagonalArrow className='inline' />
        </Link>{' '}
        by Jhey. The source code can be viewed{' '}
        <Link
          href='https://github.com/ShubhamVerma1811/Website/blob/main/app/craft/jhey-book-a-demo-button/README.md'
          target='_blank'
          rel='noopener noreferrer'
          className='inline underline underline-offset-4'>
          here
          <DiagonalArrow className='inline' />
        </Link>{' '}
        .
      </p>

      <style>{`
      .jhey-container {
        .mask {
          mask: url('/assets/images/chev.webp');
          mask-repeat: no-repeat;
          background: radial-gradient(#000, transparent);
          background-size: 500px;
        }

        button:is(:hover, :focus-visible) .container {
          width: 100%;
          background-repeat: repeat-x;
        }

        button:is(:hover, :focus-visible) .container .mask {
          mask-repeat: repeat-x;
        }

        button:is(:active) .container {
          transform: scale(0.95);
        }

        @keyframes fly {
          0% {
            background-position-x: 100%;
          }

          100% {
            background-position-x: 0%;
          }
        }
      }
      `}</style>
    </div>
  );
};

export default Page;
