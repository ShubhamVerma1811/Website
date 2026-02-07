import { DiagonalArrow } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HIRE_MAIL, RESUME_URL } from 'services/constants';
import { generateMetaData } from 'services/util';

export const metadata = generateMetaData({
  title: 'Experience | Shubham Verma'
});

const exps = [
  {
    title: 'Senior Software Engineer',
    company: 'GeekyAnts',
    date: 'Jul 2021 - Present',
    iconPath: '/assets/logos/ga/logo.svg',
    roles: [
      {
        title: 'Senior Software Engineer',
        date: 'Jul 2023 - Present',
        points: [
          'Built online ordering platform for 12 Darden brands including Olive Garden and LongHorn Steakhouse, featuring menu system, location search, order tracking, and Azure B2C authentication, serving 3+ million monthly users.',
          'Architected multi-brand Azure B2C templating system with automated build pipeline, generating brand-specific HTML/CSS/JS/assets from shared templates using dynamic variable injection and environment-based configuration, reducing deployment time from 30 minutes to 2 minutes across all brands (93% reduction).',
          'Optimized project bundle size from 900KB to 540KB (40% reduction) through code-splitting and lazy-loading, improving page load times.',
          'Collaborated with Amazon to develop Amazon Music desktop client proof-of-concept using Tauri with Rust-based IPC, HTTP caching for offline support, and automated GitLab CI/CD pipeline for multi-platform builds.'
        ]
      },
      {
        title: 'Software Engineer',
        date: 'Jul 2021 - Jun 2023',
        points: [
          'Engineered shared UI components using NX, Next.js, React Native, and NativeBase for multi-brand food ordering platform, eliminating duplicate web/mobile implementations.',
          'Implemented HTTP caching layer with localStorage/sessionStorage and header-based invalidation across all Darden brands, reducing redundant API calls.',
          'Coordinated delivery of 5 features across 8 engineers, managing client communication and sprint planning to meet deadlines.'
        ]
      }
    ]
  }
];

function Resume() {
  return (
    <React.Fragment>
      <p className='mb-6 font-extrabold font-secondary text-3xl text-skin-secondary'>
        Work
      </p>
      <div className='-mt-3 mb-6 flex flex-wrap items-center'>
        <a
          target='_blank'
          href={`mailto:${HIRE_MAIL}`}
          data-umami-event='hero-calendar'
          className='mt-3 w-max rounded-md p-2 text-lg text-md text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted md:text-lg'
          rel='noopener noreferrer'>
          Hire Me
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
      </div>

      <div>
        {exps?.map((item, index) => {
          return (
            <div
              className={`border-l-4 ${
                index !== exps.length - 1 && 'border-b-4'
              } my-2 flex flex-col border-skin-secondary-muted pl-2 md:px-4 lg:flex-row`}
              key={item.title}>
              <div className='mr-4'>
                <Image
                  src={item.iconPath}
                  width={40}
                  height={40}
                  alt={`${item.company}-logo`}
                />
              </div>
              <div>
                <p className='mb-2 text-lg text-skin-secondary'>
                  {item.company}
                </p>
                {item?.roles?.map((role) => (
                  <React.Fragment key={role.title}>
                    <p className='font-bold font-secondary text-skin-secondary text-xl'>
                      {role?.title}
                    </p>
                    <p className='mb-2 font-medium text-md text-skin-primary-muted'>
                      {role?.date}
                    </p>
                    {role.points?.map((point, index) => (
                      <ul key={point} className='mx-8'>
                        <li className='list-disc text-skin-secondary'>
                          <p className='mb-2'>{point}</p>
                        </li>
                      </ul>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Resume;
