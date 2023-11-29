'use client';

import React from 'react';
import { fetcher } from 'services/fetcher';
import useSWR from 'swr';
import { NowPlaying as INowPlaying } from 'types/spotify.types';
import { SpotifyIcon } from './Icons';

export const NowPlaying = () => {
  const { data: track } = useSWR<INowPlaying>(
    '/api/spotify/nowPlaying',
    fetcher
  );

  return (
    <div className='truncate'>
      <div className='flex text-lg gap-3 items-center'>
        <SpotifyIcon className='inline h-6 w-6 text-[#1DB954]' />
        <div className='overflow-hidden'>
          <a
            href={track?.songUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={`truncate underline-offset-4 hover:underline
              ${
                track?.isPlaying
                  ? 'text-skin-secondary'
                  : 'text-skin-primary-muted'
              }
            `}>
            {track?.isPlaying ? track.title : 'Not Playing'}{' '}
            {track?.isPlaying && track?.artist && (
              <React.Fragment>
                <span className='text-skin-primary-muted'> by </span>{' '}
                {track.isPlaying ? track?.artist : 'Unknown'}
              </React.Fragment>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};
