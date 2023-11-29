import Link from 'next/link';
import { HIRE_MAIL, RESUME_URL } from 'services/constants';

export const About = () => {
  return (
    <>
      <p className='text-skin-secondary text-lg'>
        As a software engineer, I'm passionate about creating beautiful
        products. In my downtime, I love constructing{' '}
        <Link href='/projects' className='inline underline underline-offset-4'>
          projects
        </Link>{' '}
        and exploring the latest in tech.
      </p>

      <p className='text-skin-secondary text-lg mt-4 font-extralight'>
        I've honed my skills in building performant, scalable web apps using
        tools like Next.js, Svelte-kit, Typescript and their ecosystem. I'm also
        well-versed in full-stack development with Node, Express, and both SQL
        and NoSQL databases. For more details, feel free to check out my{' '}
        <Link
          target='_blank'
          rel='noopener noreferrer'
          href={`${RESUME_URL}`}
          className='inline underline underline-offset-4'>
          resume
        </Link>
        .
      </p>

      <p className='text-skin-secondary text-lg mt-4'>
        Currently, I'm diving into exciting areas like Rust, Framer Motion, and
        Generative AI.
      </p>

      <p className='text-skin-secondary text-lg mt-4'>
        I'm always open to working on intriguing projects. If you've got
        something in mind,{' '}
        <Link
          href={`mailto:${HIRE_MAIL}`}
          className='inline underline underline-offset-4'>
          let's chat
        </Link>
        .
      </p>
    </>
  );
};
