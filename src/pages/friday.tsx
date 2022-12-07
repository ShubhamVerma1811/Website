import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';

const Friday = () => {
  const AAJ_FRIDAY_HAI = new Date().getDay() === 5;

  return (
    <PageLayout>
      <MetaLayout
        title='FRIDAY AAAAAA!'
        image_url={`${process.env.DOMAIN}/api/og?title=FRIDAY AAAAAA!`}
        description='Keda kaabu ni husan te paave, Dil seene to nikalda jaave, batti bor billo do nain kaale'
      />
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
            src='https://www.youtube-nocookie.com/embed/ah8StqTM7hg?controls=0'
            title='Aaj Friday hai'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
        )}
      </div>
    </PageLayout>
  );
};

export default Friday;
