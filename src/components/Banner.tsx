import Link from 'next/link';
import { HIRE_MAIL } from 'services/constants';

export const Banner = () => {
  if (process.env.SHOWBANNER === 'false') {
    return null;
  }

  return (
    <div className='bg-[#264e33] p-1 px-3'>
      <p className='font-bold text-md text-center text-[#ff0]'>
        Hi, I am open to new opportunities. Know about
        <Link href='/about'>
          <span
            data-umami-event='banner-work'
            className='underline underline-offset-4 break-words'>
            {' '}
            me & my work here{' '}
          </span>
        </Link>
        and reach me via
        <Link href={`mailto:${HIRE_MAIL}`}>
          <span
            data-umami-event='banner-mail'
            className='underline underline-offset-4 break-words'>
            {' '}
            mail{' '}
          </span>
        </Link>
        or below socials.
      </p>
    </div>
  );
};
