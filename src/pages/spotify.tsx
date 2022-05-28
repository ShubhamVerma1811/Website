import { PageLayout } from 'layouts';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { getTopTracks } from 'services/spotify';
import { NowPlaying as INowPlaying } from 'types/spotify.types';

const Spotify = ({
  tracks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <section className='my-12'>
        <p className='mb-3 text-4xl font-bold text-skin-secondary'>
          Top Tracks
          <span className='mx-3 text-base'>(Past Month)</span>
        </p>
        <div className='my-12'>
          {tracks?.map((song, index) => (
            <ol>
              <li>
                <div className='flex flex-row items-start'>
                  <span className='text-skin-primary-muted'>{index + 1}.</span>
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
    </PageLayout>
  );
};

export default Spotify;

export const getStaticProps = async () => {
  const response = await getTopTracks();

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
      id,
    };
  });

  return {
    props: {
      tracks,
    },
    // every 6 hours
    revalidate: 60 * 60 * 6,
  };
};
