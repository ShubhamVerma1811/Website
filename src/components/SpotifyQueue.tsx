'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import type { Song } from 'services/spotify';

type Section = 'queue' | 'recently';

// TODO:: maybe context instead of prop drilling.

const initialSongs: Song[] = [
  {
    idx: 0,
    id: '7KHz9ozYcZfGMn5IQxsy33',
    artist: 'DIVINE, Raja Kumari',
    title: 'Roots (feat. Raja Kumari)',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b2730ec6a95396ec0553cd3ab496',
    previewUrl:
      'https://p.scdn.co/mp3-preview/3c1d2a6fff091bfe1342830686e6ab554b36e830?cid=cfe923b2d660439caf2b557b21f31221'
  },
  {
    idx: 1,
    id: '0OA00aPt3BV10qeMIs3meW',
    artist: 'Hanumankind, Kalmi',
    title: 'Big Dawgs',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02d9afe5c70c43cb2bd34605ea',
    previewUrl:
      'https://p.scdn.co/mp3-preview/d2514a74db6db24e9d1667074a8e7ff8c42d51bf?cid=513092d68c664408b82a4db4a2afa861'
  },
  {
    idx: 2,
    id: '7mLXXOYfVQdBHkrI6HASt8',
    artist: 'Connor Price, Nic D, 4Korners',
    title: 'Swing',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27303493959de43659b60c4b7f4',
    previewUrl:
      'https://p.scdn.co/mp3-preview/1f6d40e975891d59af1104b5863c8f9379758ee7?cid=cfe923b2d660439caf2b557b21f31221'
  },
  {
    idx: 3,
    id: '2kQ4qdEtzWR1scQBlsjl8M',
    artist: 'Faris Shafi, Umair Butt, Gharvi Group',
    title: 'Blockbuster',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27374a0dfa33a8d19e47f7314b6',
    previewUrl:
      'https://p.scdn.co/mp3-preview/297dd5ac23e5769eb4789cf454f64bb07b5bdb03?cid=cfe923b2d660439caf2b557b21f31221'
  },
  {
    idx: 4,
    id: '2tudvzsrR56uom6smgOcSf',
    artist: 'Future, Metro Boomin, Kendrick Lamar',
    title: 'Like That',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b273a46b07c291e6dfdee13b3ee8',
    previewUrl:
      'https://p.scdn.co/mp3-preview/793f43da71fe668c35b72a38ae7f93e783823e17?cid=cfe923b2d660439caf2b557b21f31221'
  },

  {
    idx: 5,
    id: '0DPjmMiDoPiMNPTtorAMeY',
    artist: 'Seedhe Maut, Sez on the Beat',
    title: 'Shaktimaan',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b2734075c0a5794d989b81d01e4f',
    previewUrl:
      'https://p.scdn.co/mp3-preview/10131d2a253bae97bf47a892440a7e83946f5cef?cid=cfe923b2d660439caf2b557b21f31221'
  },
  {
    idx: 6,
    id: '2Tc8PNcBdBnu0MfwxmwZc5',
    artist: 'Seedhe Maut, Sez on the Beat',
    title: 'MMM',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b2733d8355e9316ac23d60c1a338',
    previewUrl:
      'https://p.scdn.co/mp3-preview/fdd76d32db4b7ea822b7092953bc5243261f5221?cid=cfe923b2d660439caf2b557b21f31221'
  },
  {
    idx: 7,
    id: '0JtIWgsblOvJfpoyhGkFuS',
    artist: 'Eminem',
    title: 'Mockingbird',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b273dfd0ebe9b4b99f621f376453',
    previewUrl:
      'https://p.scdn.co/mp3-preview/43887419c9301358d28b7d487dfeb078f9668a6a?cid=cfe923b2d660439caf2b557b21f31221'
  },
  {
    idx: 8,
    id: '08Isz2ETWSBhvIl8UpKYsp',
    artist: 'Shubh',
    title: 'No Love',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b2732a46046339bd779f95a8cf8b',
    previewUrl:
      'https://p.scdn.co/mp3-preview/bf01e12420b9997eb503c0af333ef3eedbf6e4b1?cid=cfe923b2d660439caf2b557b21f31221'
  },
  {
    idx: 9,
    id: '5a11x5PUFvJEadMRqtNtTr',
    artist: 'Atif Aslam, Shreya Ghoshal, Sachin-Jigar',
    title: 'Piya O Re Piya',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b2739546c25ac50268b2b74842e7',
    previewUrl:
      'https://p.scdn.co/mp3-preview/1e2e6c0c4935c8e8e2be50b01c55d01aa63ae932?cid=cfe923b2d660439caf2b557b21f31221'
  }
];

const SpotifyQueue = () => {
  // const { data: initialSongs } = useSWR('/api/spotify/recentlyPlayed', fetcher);

  const [activeSong, setActiveSong] = useState<Song>({} as Song);
  const [songsList, setSongsList] = useState<Array<Song>>([]);
  const [activeSection, setActiveSection] = useState<Section>('queue');
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (initialSongs && initialSongs.length > 0) {
      setActiveSong(initialSongs[0]);
      setSongsList(initialSongs.slice(1));
    }
  }, [initialSongs]);

  useEffect(() => {
    if (initialSongs && activeSong) {
      setSongsList(initialSongs.filter((song) => song.idx > activeSong.idx));
    }
  }, [activeSong, initialSongs]);

  useEffect(() => {
    if (activeSong?.previewUrl) {
      audioRef.current?.play();
    }
  }, [activeSong?.previewUrl]);

  const handleEnd = () => {
    // play next song
    const activeIdx = activeSong?.idx;
    if (activeIdx < initialSongs.length - 1) {
      setActiveSong(initialSongs[activeIdx + 1]);
    } else {
      setActiveSong(initialSongs[0]);
    }
  };

  return (
    <div className='bg-gray-950 h-dvh spotify'>
      <audio
        src={activeSong?.previewUrl}
        controls
        className='hidden'
        onEnded={handleEnd}
        ref={audioRef}>
        <track kind='captions' />
      </audio>
      <div className='p-4 bg-gray-950 lg:w-[600px] mx-auto'>
        <NavBar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />

        <AnimatePresence initial={false}>
          {activeSection === 'queue' ? (
            <QueueUI
              activeSong={activeSong}
              songsList={songsList}
              setActiveSong={setActiveSong}
              setSongsList={setSongsList}
              initialSongs={initialSongs}
            />
          ) : (
            <RecentlyPlayedUI
              activeSong={activeSong}
              initialSongs={initialSongs}
            />
          )}
        </AnimatePresence>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital@0;1&display=swap');

        .spotify > * {
          font-family: 'Work Sans', sans-serif;
        }
      `}</style>
    </div>
  );
};

function NavBar({
  setActiveSection,
  activeSection
}: {
  setActiveSection: (section: Section) => void;
  activeSection: Section;
}) {
  return (
    <div className='flex flex-row items-center gap-4'>
      <motion.button onClick={() => setActiveSection('queue')}>
        <p
          className={`pb-2 border-b-2  font-bold ${
            activeSection === 'queue'
              ? 'text-white border-[#1ED760]'
              : 'text-gray-400 border-transparent'
          }`}>
          Queue
        </p>
      </motion.button>
      <motion.button onClick={() => setActiveSection('recently')}>
        <p
          className={`pb-2 border-b-2  font-bold ${
            activeSection === 'recently'
              ? 'text-white border-[#1ED760]'
              : 'text-gray-400 border-transparent'
          }`}>
          Recently Played
        </p>
      </motion.button>
    </div>
  );
}

function QueueUI({
  activeSong,
  songsList,
  initialSongs,
  setActiveSong,
  setSongsList
}: {
  activeSong: Song;
  songsList: Array<Song>;
  initialSongs: Array<Song>;
  setActiveSong: (song: Song) => void;
  setSongsList: (songs: Array<Song>) => void;
}) {
  return (
    <motion.div
      key='queue-ui'
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}>
      <div className='my-4'>
        <p className='pb-2 text-white font-bold'>Now Playing</p>
        <AnimatePresence mode='popLayout'>
          {activeSong ? (
            <SongItem song={activeSong} setActiveSong={setActiveSong} />
          ) : null}
        </AnimatePresence>
      </div>

      <div className='my-4'>
        <AnimatePresence>
          {!songsList?.length ? (
            <>
              <p className='text-white font-lg'>
                Queue empty,{' '}
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <span
                  className={
                    'text-[#1ED760] underline underline-offset-2 cursor-pointer'
                  }
                  onClick={() => {
                    setSongsList(initialSongs.slice(1));
                    setActiveSong(initialSongs[0]);
                  }}>
                  Click to restart.
                </span>
              </p>
            </>
          ) : (
            <>
              <motion.p layout className='pb-2 text-white font-bold'>
                Next from: Liked Songs
              </motion.p>

              {songsList?.map((song) => {
                return song.idx <= activeSong?.idx ? null : (
                  <AnimatePresence key={song.id} mode='popLayout'>
                    <SongItem song={song} setActiveSong={setActiveSong} />
                  </AnimatePresence>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function RecentlyPlayedUI({
  activeSong,
  initialSongs
}: {
  activeSong: Song;
  initialSongs: Array<Song>;
}) {
  const prevSongs = initialSongs.slice(0, activeSong?.idx);

  if (!prevSongs.length) {
    return (
      <motion.p
        key='recent-ui'
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        className='text-white my-5 text-lg'>
        Recent songs empty
      </motion.p>
    );
  }

  return (
    <motion.div key='recent-ui' initial={{ x: 20 }} animate={{ x: 0 }}>
      {prevSongs.map((song) => {
        return (
          <div key={song.id}>
            <div className='flex flex-row items-center my-3 cursor-pointer rounded-md'>
              <Image
                width={40}
                height={40}
                src={song.imageUrl}
                alt={song.title}
                className='w-10 h-10 rounded-md'
              />
              <div className='ml-3'>
                <p className='text-md text-[#1ED760]'>{song.title}</p>
                <p className='text-gray-400'>{song.artist}</p>
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

const SongItem = ({
  song,
  setActiveSong
}: {
  song: Song;
  setActiveSong: (song: Song) => void;
}) => {
  return (
    <motion.div
      key={song.id}
      layoutId={`song-${song.id}`}
      className='flex flex-row items-center my-3 cursor-pointer ounded-md'
      onClick={() => setActiveSong(song)}>
      <motion.img
        layoutId={`song-image-${song.id}`}
        src={song.imageUrl}
        alt={song.title}
        className='w-10 h-10 rounded-md'
      />
      <div className='ml-3'>
        <motion.p
          layoutId={`song-title-${song.id}`}
          className='text-md text-[#1ED760]'>
          {song.title}
        </motion.p>
        <motion.p layoutId={`song-artist-${song.id}`} className='text-gray-400'>
          {song.artist}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SpotifyQueue;
