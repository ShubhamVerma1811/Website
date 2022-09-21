import { InferGetServerSidePropsType } from 'next';

const Friday = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <div className='flex h-screen flex-row items-center justify-center'>
      {!props.AAJ_FRIDAY_HAI ? (
        <div>
          <h1 className='text-4xl font-bold text-skin-secondary md:text-8xl'>
            AAJ FRIDAY NAHI HAI
          </h1>
          <p className='text-skin-secondary'>Come back on Friday.</p>
        </div>
      ) : (
        <iframe
          width='1250'
          height='703'
          src='https://www.youtube.com/embed/ah8StqTM7hg'
          title='Aaj Friday hai sardar #meme #shorts'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
      )}
    </div>
  );
};

export default Friday;

export const getServerSideProps = async () => {
  const AAJ_FRIDAY_HAI = new Date().getDay() !== 5;

  return {
    props: {
      AAJ_FRIDAY_HAI
    }
  };
};
