import Link from 'next/link';
import { HIRE_MAIL } from 'services/constants';

export const Banner = () => {
  if (process.env.SHOWBANNER === 'false') {
    return null;
  }

  return (
    <div className='bg-[#264e33] p-1 px-3'>
      <p className='text-center font-bold text-[#ff0] text-md'>
        Hi, I am open to new collaboration opportunities. Know about
        <Link href='/about' data-umami-event='banner-work'>
          <span className='break-words underline underline-offset-4'>
            {' '}
            me & my work here{' '}
          </span>
        </Link>
        and reach me via
        <Link href={`mailto:${HIRE_MAIL}`} data-umami-event='banner-mail'>
          <span className='break-words underline underline-offset-4'>
            {' '}
            mail{' '}
          </span>
        </Link>
        or below socials.
      </p>
    </div>
  );
};
