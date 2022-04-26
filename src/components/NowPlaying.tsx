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
    <div>
      <div className='flex items-center text-lg'>
        <div className='flex items-center'>
          {!isPlaying ? (
            <SpotifyIcon className='inline h-6 w-6 text-[#1DB954]' />
          ) : (
            <div>
              <PauseIcon className='text-2xl text-skin-primary-muted' />
            </div>
          )}
        </div>

        <a
          href={track?.songUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 truncate text-skin-secondary underline-offset-4 hover:underline'>
          {track?.title || 'Not Playing'}{' '}
          {track?.title && (
            <React.Fragment>
              <span className='text-skin-primary-muted'> by </span>{' '}
              {track?.artist || 'Unknown'}
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
        className='mr-3 ml-8 inline cursor-pointer text-skin-primary-muted underline-offset-4 hover:underline'>
        {isPlaying
          ? 'Stop preview'
          : track?.previewUrl
          ? 'Listen to Preview'
          : 'No preview available'}
      </div>
      <Link href='https://shbm.fyi/sp' passHref>
        <a
          className='inline text-skin-primary-muted underline-offset-4 hover:underline'
          target='_blank'
          rel='noopener noreferrer'>
          View Profile
          <DiagonalArrow className='inline' />
        </a>
      </Link>
    </div>
  );
};
