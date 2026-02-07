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
      <div className='mx-auto mt-28 max-w-7xl px-8'>
        <div className='mb-8 text-center'>
          <p className='font-secondary text-3xl text-skin-secondary md:text-4xl'>
            Testimonials from colleagues and clients
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className='text-center'>
            <p className='font-secondary text-skin-secondary text-xl'>
              No testimonials yet.
            </p>
            <p className='mt-4 font-medium text-lg text-skin-primary-muted'>
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
                    <div className='h-12 w-12 overflow-hidden rounded-full bg-gray-200'>
                      <Image
                        src={urlFor(testimonial.avatar).url()}
                        alt={testimonial.author}
                        className='h-full w-full'
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
                  className='mx-auto max-w-3xl scroll-m-20 text-center'>
                  {testimonial.company && (
                    <p className='mb-2 font-medium text-lg text-skin-primary-muted'>
                      {testimonial.company}
                    </p>
                  )}
                  <p className='font-light font-secondary text-skin-secondary text-xl md:text-2xl'>
                    "{testimonial.quote}"
                  </p>
                  <div className='mt-4 flex flex-row items-center justify-center'>
                    <div className=''>
                      <Image
                        src={urlFor(testimonial.avatar).url()}
                        alt={testimonial.author}
                        className='size-10 rounded-full'
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className='ml-2 text-left'>
                      <p className='font-medium text-skin-secondary'>
                        {testimonial.author}
                      </p>
                      {testimonial.role && (
                        <p className='font-medium text-skin-primary-muted'>
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
