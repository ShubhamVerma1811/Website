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
    title: 'Senior Software Engineer - II',
    company: 'GeekyAnts',
    date: 'Jul 2021 - Present',
    iconPath: '/assets/logos/ga/logo.svg',
    roles: [
      {
        title: 'Senior Software Engineer - II',
        date: 'Jul 2024 - Present',
        points: [
          "Developed key modules/features of the website that resulted in significant increase in the customer's stock price by 10% after its announcement and release."
        ]
      },
      {
        title: 'Senior Software Engineer - I',
        date: 'Jul 2023 - Jun 2024',
        points: [
          'Successfully optimized frontend network performance by restructuring API responses and implementing caching strategies, resulting in accelerated API calls and reduced latency.',
          'Mentored new team members within the organization.'
        ]
      },
      {
        title: 'Software Engineer - III',
        date: 'Jul 2022 - Jun 2023',
        points: [
          'Led the team into multiple project tracks, ensuring seamless delivery from design to launch while collaborating with the stakeholders.',
          'Achieved substantial project improvements, leading to 26% reduction in bundle size, and improved Lighthouse scores and faster loading of the project.',
          'Integrated E2E tests using Cypress in the project significantly improving bugs detection and reducing developer time spent on debugging.'
        ]
      },
      {
        title: 'Software Engineer - I',
        date: 'Jul 2021 - Jun 2022',
        points: [
          'Developed and Integrated cross-platform, multi-themed UI components into React, Next.JS and React Native projects.',
          "Stepped into the responsibilities during the tech lead's absence, efficiently managing the team and project, leading to rapid career advancement."
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
