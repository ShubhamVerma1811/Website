import { DiagonalArrow } from 'components';
import { PageLayout } from 'layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getClient } from 'services/sanity-server';
import { Social } from 'types';

const Socials = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Head>
        <title>Socials | Shubham Verma</title>
        <meta
          name='description'
          content='All my socials, available at once place.'
        />
      </Head>
      <p className='mb-3 text-4xl font-bold text-skin-secondary'>Socials</p>
      <p className='text-lg text-skin-primary-muted'>
        All my socials, available at once place :)
      </p>
      <div className='my-5'>
        <ul className='flex flex-wrap'>
          {props?.socials?.map((social) => {
            return (
              <li key={social.id} className='my-3'>
                <a
                  style={{
                    color: social?.color
                  }}
                  target='_blank'
                  href={social.url}
                  className={`mt-3 mr-5 w-max rounded-md p-2 text-xl text-skin-secondary hover:bg-skin-secondary-muted`}
                  rel='noopener noreferrer'>
                  <strong> {social.name}</strong>
                  <DiagonalArrow className='inline text-xl' />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </PageLayout>
  );
};

export default Socials;

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const socials: Array<Social> = await getClient(preview).fetch(
    `*[_type == "social"] | order(_createdAt asc) {..., "id": _id}`
  );

  return {
    props: {
      socials
    }
  };
};
