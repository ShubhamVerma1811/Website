import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';

const Monday = () => {
  const AAJ_MONDAY_HAI = new Date().getDay() === 1;

  return (
    <PageLayout>
      <MetaLayout
        title='Monday ki BT HO GAYI'
        image_url={`${process.env.DOMAIN}/api/og?title=Monday ki BT HO GAYI`}
        description='Abey yaar! BT ho gayi'
      />
      <div className='flex-row items-center justify-center'>
        {!AAJ_MONDAY_HAI ? (
          <div>
            <h1 className='text-3xl font-bold text-skin-secondary md:text-8xl'>
              AAJ MONDAY NAHI HAI
            </h1>
            <p className='text-skin-secondary'>Come back on Monday for BT.</p>
          </div>
        ) : (
          <iframe
            className='h-[703px] w-full'
            src='https://www.youtube-nocookie.com/embed/ZiBF_U_iroA?controls=0&amp;end=3'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
        )}
      </div>
    </PageLayout>
  );
};

export default Monday;
