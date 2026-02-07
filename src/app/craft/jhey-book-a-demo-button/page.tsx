'use client';

import { DiagonalArrow } from 'components';
import { ClientMetaLayout } from 'layouts/ClientMetaLayout';
import Link from 'next/link';

const Page = () => {
  return (
    <div className=''>
      <p className='mb-6 font-extrabold font-secondary text-3xl text-skin-secondary'>
        Jhey's Book A Demo Button
      </p>
      <ClientMetaLayout title={`Jhey's Book Me Button | Craft`} />
      <div className='mx-auto my-16 flex select-none flex-row justify-center'>
        <button
          className='relative h-[70px] w-64 cursor-pointer select-none rounded-[10px] border-4 border-black border-solid bg-skin-secondary pl-[60px] font-bold font-secondary text-2xl text-skin-primary dark:border-white'
          type='button'>
          <span className='container absolute top-0 left-0 h-[62px] w-[60px] select-none rounded-md bg-[#d2ff4d] bg-center bg-no-repeat shadow-[0_10px_10px_-5px_#00000033] transition-[width] duration-[0.2s] ease-[ease-in-out]'>
            <span className='l mask mask-url[/assets/images/chev.webp] absolute inset-0 top-1.5 left-1.5 animate-[fly_0.7s_infinite] select-none' />
          </span>
          Book A Demo!
        </button>
      </div>
      <p className='mt-4 text-skin-secondary text-xl'>
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

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Page;
