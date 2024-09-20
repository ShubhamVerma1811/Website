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
    title: 'Software Engineer - III',
    company: 'GeekyAnts',
    date: 'Jul 2021 - Present',
    iconPath: '/assets/logos/ga/logo.svg',
    roles: [
      {
        title: 'Senior Software Engineer - I',
        date: 'Jul 2023 - Present',
        points: [
          'Orchestrated the restructuring of API responses in collaboration with clients and the backend team, concurrently managing the smooth migration of the codebase.'
        ]
      },
      {
        title: 'Software Engineer - III',
        date: 'Jul 2022 - Present',
        points: [
          'Led multiple project modules with a team of six developers, ensuring seamless delivery from design to launch while closely collaborating with clients and tech leads.',
          'Maintained code quality through thorough reviews and implemented advanced E2E tests using Cypress and Percy.',
          'Achieved substantial project improvements, including dynamic component loading, a 26% reduction in bundle size, and boosted Lighthouse and SEO scores.'
        ]
      },
      {
        title: 'Software Engineer - I',
        date: 'Jul 2021 - Present',
        points: [
          'Created cross-platform UI components for web and mobile with multi-theme support.',
          "Stepped into a leadership role during the tech lead's absence, successfully managing the team and project.",
          'Improved component performance to enhance app functionality and achieved rapid career advancement from SE-I to SE-III within a year, reflecting exceptional performance and expertise.'
        ]
      }
    ]
  }
];

function Resume() {
  return (
    <React.Fragment>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Work
      </p>
      <div className='-mt-3 mb-6 flex flex-wrap items-center'>
        <a
          target='_blank'
          href={`mailto:${HIRE_MAIL}`}
          data-umami-event='hero-calendar'
          className='text-md mt-3 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted md:text-lg'
          rel='noopener noreferrer'>
          Hire Me
          <DiagonalArrow className='inline text-xl' />
        </a>
        <Link
          href={RESUME_URL}
          target='_blank'
          rel='noopener noreferrer'
          data-umami-event='hero-resume'
          className='mr-2 mt-3 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted'>
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
                    <p className='font-secondary text-xl font-bold text-skin-secondary'>
                      {role?.title}
                    </p>
                    <p className='text-md mb-2 font-medium text-skin-primary-muted'>
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
