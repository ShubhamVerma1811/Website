import { PageLayout } from 'layouts';
import Image from 'next/future/image';

const exps = [
  {
    title: 'Software Engineer - III',
    company: 'GeekyAnts',
    date: 'Jul 2021 - Present',
    iconPath: '/assets/logos/ga/logo.svg',
    // TODO: Add description
    points: []
  }
];

const Resume = () => {
  return (
    <PageLayout title='Experience'>
      <p className='-mt-3 mb-6 text-lg text-skin-secondary underline underline-offset-4'>
        <a
          href='https://drive.google.com/file/d/1WL5bIjipkpulVW6a3gcwHgMGpvvU6IFq/view?usp=sharing'
          target='_blank'
          rel='noopener noreferrer'>
          View PDF version of the resume.
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
                <Image src={item.iconPath} width={40} height={40} />
              </div>
              <div>
                <p className='mb-2 text-xl font-bold text-skin-secondary'>
                  {item.title}
                </p>
                <p className='mb-2 text-lg font-medium text-skin-secondary'>
                  {item.company}
                </p>
                <p className='text-md mb-2 font-medium text-skin-primary-muted'>
                  {item.date}
                </p>
                {item.points?.map((point, index) => (
                  <ul key={index} className='mx-8'>
                    <li className='list-disc text-skin-secondary'>
                      <p className='mb-2 text-sm font-medium '>{point}</p>
                    </li>
                  </ul>
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
