import { DiagonalArrow } from 'components/Icons';
import { TWITTER_URL } from 'services/constants';

export const metadata = {
  title: 'Colophon | Shubham Verma',
  openGraph: {
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Colophon | Shubham Verma.`
      }
    ]
  }
};

const Colophon = () => {
  const refs = [
    {
      site: 'Leerob.io',
      by: 'Lee',
      url: 'https://leerob.io',
      twitter: 'https://twitter.com/leeerob/'
    },
    {
      site: 'nikolovlazar.com',
      by: 'Lazar',
      url: 'https://nikolovlazar.com',
      twitter: 'https://twitter.com/nikolovlazar'
    },
    {
      site: 'dpnkr.in',
      by: 'Deepankar',
      url: 'https://dpnkr.in',
      twitter: 'https://twitter.com/DeepankarBhade'
    },
    {
      site: 'nirmalyaghosh.com',
      by: 'NirmalyaGhosh_',
      url: 'https://nirmalyaghosh.com',
      twitter: 'https://twitter.com/NirmalyaGhosh_'
    }
  ];

  return (
    <>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Colophon
      </p>
      <p className='mb-4 text-lg text-skin-secondary'>
        This website is developed by{' '}
        <a
          href={TWITTER_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='inline text-skin-accent underline-offset-4 hover:underline'>
          Shubham Verma
          <DiagonalArrow className='inline-block' />
        </a>
      </p>
      <p className='text-lg text-skin-secondary'>
        The tech stack is{' '}
        <a
          href='https://nextjs.com'
          className='text-skin-accent underline-offset-4 hover:underline'
          target='_blank'
          rel='noopener noreferrer'>
          NextJS
        </a>{' '}
        (SSG for all and ISR for blogs),{' '}
        <a
          href='https://github.com/hashicorp/next-mdx-remote'
          className='text-skin-accent underline-offset-4 hover:underline'
          target='_blank'
          rel='noopener noreferrer'>
          MDX(Next MDX Remote)
        </a>
        ,{' '}
        <a
          href='https://tailwindcss.com'
          className='text-skin-accent underline-offset-4 hover:underline'
          target='_blank'
          rel='noopener noreferrer'>
          Tailwind CSS
        </a>
        , and{' '}
        <a
          href='https://sanity.io'
          className='text-skin-accent underline-offset-4 hover:underline'
          target='_blank'
          rel='noopener noreferrer'>
          Sanity
        </a>{' '}
        as CMS, and it&apos;s hosted on{' '}
        <a
          className='text-skin-accent underline-offset-4 hover:underline'
          target='_blank'
          rel='noopener noreferrer'
          href='https://vercel.com'>
          Vercel
        </a>
        .
      </p>
      <p className='my-4 text-lg text-skin-secondary'>
        <a
          className='text-skin-accent underline-offset-4 hover:underline'
          target='_blank'
          rel='noopener noreferrer'
          href='https://umami.is'>
          Umami
        </a>{' '}
        is used for analytics. It&apos;s a self hosted analytics platform.
      </p>
      <p className='my-4 text-lg text-skin-secondary'>
        Everything is Open Source 💖
        <br /> The source code is available on{' '}
        <a
          className='text-skin-accent underline-offset-4 hover:underline'
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/ShubhamVerma1811/Website'>
          GitHub
        </a>
      </p>

      <p className='mb-1 text-skin-primary-muted'>
        This website is built by talking the following sites as references. Do
        check them out.
      </p>

      <ul>
        {refs.map(({ site, by, twitter }, index) => (
          <li className='text-lg text-skin-secondary' key={index}>
            {site} <span className='text-skin-primary-muted'>by</span>{' '}
            <a
              className='text-skin-accent underline-offset-4 hover:underline'
              target='_blank'
              rel='noopener noreferrer'
              href={twitter}>
              {by}
              <DiagonalArrow className='inline-block' />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Colophon;
