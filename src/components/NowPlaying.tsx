import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { fetcher } from 'services/fetcher';
import useSWR from 'swr';
import { NowPlaying as INowPlaying } from 'types/spotify.types';
import { DiagonalArrow, PauseIcon, SpotifyIcon } from './Icons';

export const NowPlaying = () => {
  const { data: track } = useSWR<INowPlaying>(
    '/api/spotify/nowPlaying',
    fetcher,
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (!track?.previewUrl) return;
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className='truncate'>
      <div className='flex text-lg'>
        <div className=''>
          {!isPlaying ? (
            <SpotifyIcon className='inline h-6 w-6 text-[#1DB954]' />
          ) : (
            <div>
              <PauseIcon className='text-2xl text-skin-primary-muted' />
            </div>
          )}
        </div>
        <div className='ml-2'>
          <div className='mb-1'>
            <a
              href={track?.songUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='truncate text-skin-secondary underline-offset-4 hover:underline'>
              {track?.isPlaying ? track.title : 'Not Playing'}{' '}
              {track?.isPlaying && track?.artist && (
                <React.Fragment>
                  <span className='text-skin-primary-muted'> by </span>{' '}
                  {track.isPlaying ? track?.artist : 'Unknown'}
                  {track?.title && <DiagonalArrow className='inline' />}
                </React.Fragment>
              )}
            </a>

            <audio
              className='hidden'
              src={track?.previewUrl}
              onEnded={() => setIsPlaying(false)}
              // check if is playing
              ref={audioRef}
              controls
            />
          </div>
          <div
            onClick={handlePlay}
            className='inline cursor-pointer text-skin-primary-muted underline-offset-4 hover:underline'>
            {isPlaying
              ? 'Stop preview'
              : track?.isPlaying && track?.previewUrl
              ? 'Listen preview'
              : 'No preview'}
          </div>
          <Link href='/spotify' passHref>
            <a className='mx-3 inline text-skin-primary-muted underline-offset-4 hover:underline'>
              Check Stats
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
