import Image from 'next/image';
import React from 'react';
import { RESUME_URL } from 'services/constants';

export const metadata = {
  title: 'Experience | Shubham Verma',
  openGraph: {
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Experience | Shubham Verma.`
      }
    ]
  }
};

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
        title: 'Software Engineer - I',
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

function Resume() {
  return (
    <>
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
              } my-2 flex flex-col border-skin-secondary-muted pl-2 md:px-4 lg:flex-row`}
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
                <p className='mb-2 text-lg text-skin-secondary'>
                  {item.company}
                </p>
                {item?.roles?.map((role) => (
                  <React.Fragment>
                    <p className='font-secondary text-xl font-bold text-skin-secondary'>
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
    </>
  );
}

export default Resume;