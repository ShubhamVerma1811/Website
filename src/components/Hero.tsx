import Link from 'next/link';
import {
  CITY,
  COUNTRY,
  CURRENT_ORGANIZATION,
  CURRENT_TITLE,
  HIRE_MAIL,
  RESUME_URL
} from 'services/constants';
import { DiagonalArrow } from './Icons';

export const Hero = () => {
  return (
    <div className='flex flex-col bg-skin-primary'>
      <div>
        {/* <p className='font-secondary text-3xl font-bold text-skin-secondary'>
          Shubham Verma
        </p> */}
        <p className='mt-1 max-w-lg text-skin-primary-muted text-xl'>
          I'm <span className='text-skin-secondary'>Shubham Verma</span>, an
          engineer, learner and builder. <br />
          {CURRENT_TITLE} at <strong>{CURRENT_ORGANIZATION}</strong>
          <br />
          Based out of{' '}
          <Link
            href={`https://www.google.com/maps/place/${CITY},+${COUNTRY}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-skin-primary-muted underline underline-offset-4 transition-colors hover:text-skin-secondary'>
            {CITY}, {COUNTRY}
            <DiagonalArrow className='ml-1 inline text-sm' />
          </Link>
        </p>
        {/* <p className='text-md mt-3 text-skin-primary-muted md:text-lg'>
          I like to build open source tools and write articles.
        </p> */}

        <div className='flex flex-wrap items-center'>
          <a
            target='_blank'
            href={`mailto:${HIRE_MAIL}`}
            data-umami-event='hero-calendar'
            className='mt-3 w-max rounded-md p-2 text-lg text-md text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted md:text-lg'
            rel='noopener noreferrer'>
            Work with me
            <DiagonalArrow className='inline text-xl' />
          </a>
          <Link
            href={RESUME_URL}
            target='_blank'
            rel='noopener noreferrer'
            data-umami-event='hero-resume'
            className='mt-3 mr-2 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted'>
            Resume
            <DiagonalArrow className='inline text-xl' />
          </Link>
          {/* <a
            target='_blank'
            href={CAL_URL}
            data-umami-event="hero-calendar"
            className='text-md mt-3 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted md:text-lg'
            rel='noopener noreferrer'>
            Schedule a meet
            <DiagonalArrow className='inline text-xl' />
          </a> */}
        </div>
      </div>
      {/* <div className='overflow-clip md:ml-auto md:mr-0'>
        <Image
          src='https://avatars.githubusercontent.com/u/25576658'
          alt='Shubham Verma'
          width='120'
          height='120'
          className='rounded-full'
          title='Shubham Verma'
        />
      </div> */}
    </div>
  );
};
