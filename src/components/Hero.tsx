import Image from 'next/image';
import Link from 'next/link';
import {
  CAL_URL,
  CURRENT_ORGANIZATION,
  CURRENT_TITLE
} from 'services/constants';
import { DiagonalArrow } from './Icons';

export const Hero = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row'>
      <div>
        <p className='text-4xl font-bold text-skin-secondary'>Shubham Verma</p>
        <p className='mt-2 text-lg text-skin-primary-muted'>
          {CURRENT_TITLE} at <strong>{CURRENT_ORGANIZATION}</strong>
        </p>
        {/* <p className='text-md mt-3 text-skin-primary-muted md:text-lg'>
          I like to build open source tools and write articles.
        </p> */}

        <div className='flex flex-wrap items-center'>
          <Link href='/resume'>
            <a className=' umami--click--hero-resume mt-3 mr-2 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted'>
              Resume
            </a>
          </Link>
          <a
            target='_blank'
            href={CAL_URL}
            className='umami--click--hero-calendar text-md mt-3 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted md:text-lg'
            rel='noopener noreferrer'>
            Schedule a meet 🗓️
            <DiagonalArrow className='inline text-xl' />
          </a>
        </div>
      </div>
      <div className='overflow-clip md:mr-0 md:ml-auto'>
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
