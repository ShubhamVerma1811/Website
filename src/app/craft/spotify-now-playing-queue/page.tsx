import { ClientMetaLayout } from 'layouts/ClientMetaLayout';
import dynamic from 'next/dynamic';

const Comp = dynamic(
  () => import('../../../components/SpotifyQueue').then((mod) => mod.default),
  {
    ssr: false
  }
);

const Page = () => {
  return (
    <div>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Spotify's Now Playing with Framer Motion
      </p>
      <ClientMetaLayout title={`Spotify's Now Playing with Framer Motion`} />
      <Comp />
    </div>
  );
};

export default Page;
