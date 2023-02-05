import { DiagonalArrow } from 'components';
import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { SPOTIFY_URL } from 'services/constants';
import { getTopArtists, getTopTracks } from 'services/spotify';
import { NowPlaying as INowPlaying } from 'types/spotify.types';

const Spotify = ({
  tracks,
  artists
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <React.Fragment>
      <PageLayout>
        <MetaLayout
          title='Spotify | Shubham Verma'
          image_url={`${process.env.DOMAIN}/api/og?title=Spotify | Shubham Verma`}
          description='Top artists and top tracks from Spotify.'
        />
        <p className='text-lg text-skin-primary-muted'>
          These are the top Spotify tracks and artists that I&apos;ve been
          listening to this month!
        </p>
        <Link href={SPOTIFY_URL} passHref>
          <a
            className='inline text-skin-primary-muted underline-offset-4 hover:underline'
            target='_blank'
            rel='noopener noreferrer'>
            View Spotify Profile
            <DiagonalArrow className='inline' />
          </a>
        </Link>
        <section className='my-12 scroll-m-20' id='top-tracks'>
          <a href='#top-tracks'>
            <p className='mb-3 font-secondary text-4xl font-bold text-skin-secondary'>
              Top Tracks
              <span className='mx-3 text-base font-light'>(This Month)</span>
            </p>
          </a>
          <div className='my-12'>
            {tracks?.map((song, index) => (
              <ol key={index}>
                <li>
                  <div className='flex flex-row items-start'>
                    <span className='text-skin-primary-muted'>
                      {index + 1}.
                    </span>
                    <div className='ml-3 w-full'>
                      <a
                        href={song?.songUrl}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <p className='text-xl text-skin-secondary underline-offset-4 hover:underline'>
                          {song?.title}
                        </p>
                      </a>
                      <p className='text-md text-skin-primary-muted'>
                        {song?.artist}
                      </p>
                      <hr className='my-4 border-skin-primary-muted' />
                    </div>
                  </div>
                </li>
              </ol>
            ))}
          </div>
        </section>
        <section className='my-12 scroll-m-20' id='top-artists'>
          <a href='#top-artists'>
            <p className='mb-3 font-secondary text-4xl font-bold text-skin-secondary'>
              Top Artists
              <span className='mx-3 text-base font-light'>(This Month)</span>
            </p>
          </a>
          <div className='my-12'>
            {artists?.map((artist, index) => (
              <ol key={index}>
                <li>
                  <div className='flex flex-row items-start'>
                    <span className='text-skin-primary-muted'>
                      {index + 1}.
                    </span>
                    <div className='ml-3 w-full'>
                      <a
                        href={artist?.artistUrl}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <p className='text-xl text-skin-secondary underline-offset-4 hover:underline'>
                          {artist?.name}
                        </p>
                      </a>

                      <hr className='my-4 border-skin-primary-muted' />
                    </div>
                  </div>
                </li>
              </ol>
            ))}
          </div>
        </section>
      </PageLayout>
    </React.Fragment>
  );
};

export default Spotify;

export const getStaticProps = async () => {
  const response = await getTopTracks();
  const resp = await (await getTopArtists()).json();

  const data = await response.json();

  // @ts-ignore
  const tracks: Array<INowPlaying> = data?.items?.map((song) => {
    const title = song?.name;
    const artist = song?.artists.map((_artist: any) => _artist.name).join(', ');
    const songUrl = song?.external_urls?.spotify;
    const id = song?.id;

    return {
      title,
      artist,
      songUrl,
      id
    };
  });

  const artists: {
    name: string;
    id: string;
    artistUrl: string;
    // @ts-ignore
  }[] = resp?.items?.map((artist) => {
    return {
      name: artist?.name,
      id: artist?.id,
      artistUrl: artist?.external_urls?.spotify
    };
  });

  return {
    props: {
      tracks,
      artists
    },
    // every 6 hours
    revalidate: 60 * 60 * 6
  };
};
