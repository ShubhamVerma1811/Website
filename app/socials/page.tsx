import { DiagonalArrow } from 'components/Icons';
import React from 'react';

import { getClient } from 'services/sanity-server';
import { Social } from 'types';

export const metadata = {
  title: 'Socials | Shubham Verma',
  openGraph: {
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Socials | Shubham Verma.`
      }
    ]
  }
};

async function getData() {
  const socials: Array<Social> = await getClient().fetch(
    `*[_type == "social"] | order(_createdAt asc) {..., "id": _id}`
  );

  return {
    socials
  };
}

const Socials = async () => {
  const { socials } = await getData();

  return (
    <React.Fragment>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Socials
      </p>
      <div className='my-5'>
        <ul className='flex flex-wrap'>
          {socials?.map((social) => {
            return (
              <li key={social.id} className='my-3'>
                <a
                  style={{
                    color: social?.color
                  }}
                  target='_blank'
                  href={social.url}
                  className={`umami--click--socials-${social.name} mr-5 mt-3 w-max rounded-md p-2 text-xl text-skin-secondary hover:bg-skin-secondary-muted`}
                  rel='noopener noreferrer'>
                  <strong> {social.name}</strong>
                  <DiagonalArrow className='inline text-xl' />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Socials;
