import Image from 'next/image';
import Link from 'next/link';
import {
  CAL_URL,
  CURRENT_ORGANIZATION,
  CURRENT_TITLE,
  GITHUB_URL,
  LINKEDIN_URL,
  TWITTER_URL
} from 'services/constants';
import { DiagonalArrow } from './Icons';

export const Hero = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row'>
      <div>
        <p className='text-4xl font-bold text-skin-secondary'>
          Hey 👋, I am Shubham Verma!
        </p>
        <p className='mt-2 text-lg text-skin-secondary'>
          {CURRENT_TITLE} at{' '}
          <a
            target='_blank'
            href='https://geekyants.com'
            rel='noopener noreferrer'
            className='pb-1 hover:border-b'>
            <strong className='text-[#ca0000]'>
              {CURRENT_ORGANIZATION}
              <DiagonalArrow className='inline text-xl' />
            </strong>
          </a>
        </p>
        <p className='text-md mt-3 text-skin-secondary md:text-lg'>
          I like to build open source tools and write articles.
        </p>

        <div className='flex flex-wrap items-center'>
          <Link href='/resume'>
            <a className=' umami--click--hero-resume mt-3 mr-5 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted'>
              <strong>Resume</strong>
            </a>
          </Link>
          <a
            target='_blank'
            href={TWITTER_URL}
            className=' umami--click--hero-twitter mt-3 mr-5 w-max rounded-md p-2 text-lg text-[#1DA1F2] hover:bg-skin-secondary-muted'
            rel='noopener noreferrer'>
            <strong>Twitter</strong>
            <DiagonalArrow className='inline text-xl' />
          </a>
          <a
            target='_blank'
            href={GITHUB_URL}
            className='umami--click--hero-github mt-3 mr-5 w-max rounded-md p-2 text-lg text-skin-secondary hover:bg-skin-secondary-muted'
            rel='noopener noreferrer'>
            <strong>GitHub</strong>
            <DiagonalArrow className='inline text-xl' />
          </a>
          <a
            target='_blank'
            href={LINKEDIN_URL}
            className='umami--click--hero-linkedin mt-3 w-max rounded-md p-2 text-lg text-[#0a66c2] hover:bg-skin-secondary-muted dark:text-[#ffffffe6]'
            rel='noopener noreferrer'>
            <strong>LinkedIn</strong>
            <DiagonalArrow className='inline text-xl' />
          </a>
        </div>
        <p className='text-md mt-3 text-skin-secondary md:text-lg'>
          I'm looking to meet new people this year. <br />
          If you're interested in connecting,
          <a
            target='_blank'
            href={CAL_URL}
            className='umami--click--hero-calendar mt-3 mr-5 w-max rounded-md p-2 text-lg underline underline-offset-4 hover:bg-skin-secondary-muted'
            rel='noopener noreferrer'>
            <strong>Let's schedule a meet! 🗓️</strong>
            <DiagonalArrow className='inline text-xl' />
          </a>
        </p>
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
