import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';
import Image from 'next/future/image';
import React from 'react';
import { RESUME_URL } from 'services/constants';

const exps = [
  {
    title: 'Software Engineer - III',
    company: 'GeekyAnts',
    date: 'Jul 2021 - Present',
    iconPath: '/assets/logos/ga/logo.svg',
    roles: [
      {
        title: 'Software Engineer - III',
        date: 'Jul 2022 - Present',
        points: [
          'Customized themes for multiple brands to maintain a consistent aesthetic.',
          'Improved performance through efficient dynamic loading and server-side rendering, reducing bundle size by 26% and improving Lighthouse scores.',
          'Conducted code reviews to maintain project quality and code standards.',
          'Led three tracks under the project with a team of up to six developers, working closely with clients, the tech lead, and QA to deliver successful project outcomes.'
        ]
      },
      {
        title: 'Software Engineer',
        date: 'Jul 2021 - Present',
        points: [
          'Developed UI components for web and mobile apps using Figma mockups and variant configurations.',
          'Improved component performance through memoization and optimized loading using dynamic imports.',
          'Achieved rapid career advancement from SE-1 to SE-3 within a year, showcasing exceptional performance and expertise.',
          'Took on interim leadership role and successfully led the team and project in the absence of the designated tech lead.'
        ]
      }
    ]
  }
];

const Resume = () => {
  return (
    <PageLayout title='Experience'>
      <MetaLayout
        title='Experience | Shubham Verma'
        image_url={`${process.env.DOMAIN}/api/og?title=Experience | Shubham Verma`}
      />
      <p className='-mt-3 mb-6 text-lg text-skin-secondary underline underline-offset-4'>
        <a
          href={RESUME_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='umami--click--view-resume'>
          View Resume
        </a>
      </p>

      <div>
        {exps?.map((item, index) => {
          return (
            <div
              className={`border-l-4 ${
                index !== exps.length - 1 && 'border-b-4'
              } my-2 flex flex-row border-skin-secondary-muted px-4`}
              key={index}>
              <div className='mr-4'>
                <Image
                  src={item.iconPath}
                  width={40}
                  height={40}
                  alt={`${item.company}-logo`}
                />
              </div>
              <div>
                <p className='mb-2 font-secondary text-lg text-skin-secondary'>
                  {item.company}
                </p>
                {item?.roles?.map((role) => (
                  <React.Fragment>
                    <p className='mb-2 font-secondary text-xl font-bold text-skin-secondary'>
                      {role?.title}
                    </p>
                    <p className='text-md mb-2 font-medium text-skin-primary-muted'>
                      {role?.date}
                    </p>
                    {role.points?.map((point, index) => (
                      <ul key={index} className='mx-8'>
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
    </PageLayout>
  );
};

export default Resume;
