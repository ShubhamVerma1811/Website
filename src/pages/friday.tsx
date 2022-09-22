import React from 'react';
import { PageLayout } from 'layouts';
import Head from 'next/head';

const Friday = () => {
  const AAJ_FRIDAY_HAI = new Date().getDay() === 5;

  return (
    <React.Fragment>
      <Head>
        <title>FRIDAY AAAAAA!</title>
        <meta
          name='description'
          content='Keda kaabu ni husan te paave, Dil seene to nikalda jaave, batti bor billo do nain kaale'
        />
      </Head>
      <PageLayout>
        <div className='flex-row items-center justify-center'>
          {!AAJ_FRIDAY_HAI ? (
            <div>
              <h1 className='text-4xl font-bold text-skin-secondary md:text-8xl'>
                AAJ FRIDAY NAHI HAI
              </h1>
              <p className='text-skin-secondary'>
                Come back on Friday for a treat.
              </p>
            </div>
          ) : (
            <iframe
              className='h-[703px] w-full'
              src='https://www.youtube.com/embed/ah8StqTM7hg'
              title='Aaj Friday hai'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
          )}
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default Friday;
