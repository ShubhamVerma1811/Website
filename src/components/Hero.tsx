import Image from 'next/image';
import Link from 'next/link';
import { DiagonalArrow } from './Icons';

export const Hero = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row'>
      <div>
        <p className='text-4xl font-bold text-skin-secondary'>
          Hey, I am Shubham Verma!
        </p>
        <p className='mt-2 text-lg text-skin-secondary'>
          Software Engineer at{' '}
          <a
            target='_blank'
            href='https://geekyants.com'
            rel='noopener noreferrer'
            className='pb-1 hover:border-b'>
            <strong className='text-[#ca0000]'>
              GeekyAnts
              <DiagonalArrow className='inline text-xl' />
            </strong>
          </a>
        </p>
        <p className='text-md mt-3 text-skin-secondary md:text-lg'>
          I like to build open source tools and write articles.
        </p>
        <p className='text-md mt-3 text-skin-secondary md:text-lg'>
          <Link href='/resume'>
            <a className='mt-3 mr-5 w-max rounded-md border-2 border-skin-primary-muted bg-skin-secondary-muted p-2 text-lg hover:bg-skin-secondary-muted'>
              <strong>View Resume</strong>
            </a>
          </Link>
        </p>
        <div className='flex items-center'>
          <a
            target='_blank'
            href='https://shbm.fyi/tw'
            className=' mt-3 mr-5 w-max rounded-md p-2 text-lg text-[#1DA1F2] hover:bg-skin-secondary-muted'
            rel='noopener noreferrer'>
            <strong>Twitter</strong>
            <DiagonalArrow className='inline text-xl' />
          </a>
          <a
            target='_blank'
            href='https://shbm.fyi/gh'
            className='mt-3 mr-5 w-max rounded-md p-2 text-lg text-skin-secondary hover:bg-skin-secondary-muted'
            rel='noopener noreferrer'>
            <strong>GitHub</strong>
            <DiagonalArrow className='inline text-xl' />
          </a>
          <a
            target='_blank'
            href='https://shbm.fyi/li'
            className='mt-3 w-max rounded-md p-2 text-lg text-[#0a66c2] hover:bg-skin-secondary-muted dark:text-[#ffffffe6]'
            rel='noopener noreferrer'>
            <strong>LinkedIn</strong>
            <DiagonalArrow className='inline text-xl' />
          </a>
        </div>
      </div>
      <div className='overflow-clip grayscale hover:grayscale-0 md:mr-0 md:ml-auto'>
        <Image
          src='https://avatars.githubusercontent.com/u/25576658'
          alt='Shubham Verma'
          width='120'
          height='120'
          className='rounded-full'
          title='Shubham Verma'
        />
      </div>
    </div>
  );
};
