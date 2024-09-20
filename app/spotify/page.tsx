import React from 'react';
import { getTopArtists, getTopTracks } from 'services/spotify';
import type { NowPlaying as INowPlaying } from 'types/spotify.types';

export const revalidate = 86400;

export const metadata = {
  title: 'Spotify | Shubham Verma',
  description: 'Top artists and top tracks from Spotify.',
  openGraph: {
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Spotify | Shubham Verma`
      }
    ]
  }
};

async function getData() {
  const tracksData = await getTopTracks().then((r) => r.json());
  const artistsData = await getTopArtists().then((r) => r.json());

  // @ts-ignore
  const tracks: Array<INowPlaying> = tracksData?.items?.map((song) => {
    const title = song?.name;
    const artist = song?.artists
      .map((_artist: { name: string }) => _artist.name)
      .join(', ');
    const songUrl = song?.external_urls?.spotify;
    const id = song?.id;

    return {
      title,
      artist,
      songUrl,
      id
    };
  });

  const artists: Array<{
    name: string;
    id: string;
    artistUrl: string;
    // @ts-ignore
  }> = artistsData?.items?.map((artist) => {
    return {
      name: artist?.name,
      id: artist?.id,
      artistUrl: artist?.external_urls?.spotify
    };
  });

  return {
    tracks,
    artists
  };
}

export default async function Spotify() {
  const { artists, tracks } = await getData();

  return (
    <React.Fragment>
      <p className='text-lg text-skin-primary-muted'>
        These are the top Spotify tracks and artists that I&apos;ve been
        listening to this month!
      </p>
      <section className='my-12 scroll-m-20' id='top-tracks'>
        <a href='#top-tracks'>
          <p className='mb-3 font-secondary text-4xl font-bold text-skin-secondary'>
            Top Tracks
            <span className='mx-3 text-base font-light'>(This Month)</span>
          </p>
        </a>
        <div className='my-12'>
          {tracks?.map((song, index) => (
            <ol key={song.id}>
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
      <section className='my-12 scroll-m-20' id='top-artists'>
        <a href='#top-artists'>
          <p className='mb-3 font-secondary text-4xl font-bold text-skin-secondary'>
            Top Artists
            <span className='mx-3 text-base font-light'>(This Month)</span>
          </p>
        </a>
        <div className='my-12'>
          {artists?.map((artist, index) => (
            <ol key={artist.id}>
              <li>
                <div className='flex flex-row items-start'>
                  <span className='text-skin-primary-muted'>{index + 1}.</span>
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
    </React.Fragment>
  );
}
