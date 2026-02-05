import { BackToTop, DiagonalArrow } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { HIRE_MAIL } from 'services/constants';
import { getClient, urlFor } from 'services/sanity-server';
import { generateMetaData } from 'services/util';
import type { Testimonial } from 'types/testimonials.type';

export const metadata = generateMetaData({
  title: 'Testimonials | Shubham Verma',
  description: 'Testimonials from colleagues and clients'
});

async function getData() {
  const testimonials: Array<Testimonial> = await getClient().fetch(
    `*[_type == "testimonial"] | order(rank) {..., "id": _id}`
  );

  return testimonials;
}

export default async function Testimonials() {
  const testimonials = await getData();

  return (
    <div className='100dvh'>
      <div className='max-w-7xl mx-auto px-8 mt-28'>
        <div className='text-center mb-8'>
          <p className='text-3xl md:text-4xl font-secondary text-skin-secondary'>
            Testimonials from colleagues and clients
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className='text-center'>
            <p className='text-xl font-secondary text-skin-secondary'>
              No testimonials yet.
            </p>
            <p className='mt-4 text-lg font-medium text-skin-primary-muted'>
              Want to be the first?{' '}
              <Link
                data-umami-event='wall-get-in-touch'
                className='ml-1 text-skin-secondary underline'
                href={`mailto:${HIRE_MAIL}?subject=I have a freelancing opportunity for you!&body=Hi Shubham, I'm reaching out to you because I want to hire you. I'm looking for someone who can help me with ...`}
                title='Get in touch to give a testimonial'>
                Get in touch
                <DiagonalArrow className='inline' />
              </Link>
            </p>
          </div>
        ) : (
          <>
            <div className='mb-24'>
              <div className='flex flex-wrap justify-center gap-4'>
                {testimonials.map((testimonial) => (
                  <a
                    key={testimonial.id}
                    href={`#testimonial-${testimonial.id}`}>
                    <div className='w-12 h-12 rounded-full bg-gray-200 overflow-hidden'>
                      <Image
                        src={urlFor(testimonial.avatar).url()}
                        alt={testimonial.author}
                        className='w-full h-full'
                        width={48}
                        height={48}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className='space-y-16'>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  id={`testimonial-${testimonial.id}`}
                  className='text-center max-w-3xl mx-auto scroll-m-20'>
                  {testimonial.company && (
                    <p className='mb-2 text-lg font-medium text-skin-primary-muted'>
                      {testimonial.company}
                    </p>
                  )}
                  <p className='font-secondary font-light text-skin-secondary text-xl md:text-2xl'>
                    "{testimonial.quote}"
                  </p>
                  <div className='mt-4 flex flex-row items-center justify-center'>
                    <div className=''>
                      <Image
                        src={urlFor(testimonial.avatar).url()}
                        alt={testimonial.author}
                        className='rounded-full size-10'
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className='text-left ml-2 '>
                      <p className='text-skin-secondary font-medium'>
                        {testimonial.author}
                      </p>
                      {testimonial.role && (
                        <p className='text-skin-primary-muted font-medium'>
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <BackToTop />
    </div>
  );
}
