'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

function getVolumeIcon(vol: string, active = false) {
  switch (vol) {
    case 'vibrate':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='20'
          viewBox='0 0 24 24'>
          <path
            fill={!active ? '#fff' : '#000'}
            d='M16 19H8V5h8m.5-2h-9A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 16.5 3M19 17h2V7h-2m3 2v6h2V9M3 17h2V7H3m-3 8h2V9H0z'
          />
          <title>Vibrate</title>
        </svg>
      );
    case 'silent':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='20'
          viewBox='0 0 24 24'>
          <path
            fill={!active ? '#fff' : '#000'}
            d='M22.11 21.46L2.39 1.73L1.11 3l4.72 4.72A7 7 0 0 0 5 11v6l-2 2v1h15.11l2.73 2.73zM7 18v-7c0-.61.11-1.21.34-1.77L16.11 18zm3 3h4a2 2 0 0 1-2 2a2 2 0 0 1-2-2M8.29 5.09c.53-.34 1.11-.59 1.71-.8V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v4.8l-2-2V11a5 5 0 0 0-5-5c-.78 0-1.55.2-2.24.56z'
          />
          <title>Silent</title>
        </svg>
      );
    default:
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='24'
          viewBox='0 0 24 24'>
          <path
            fill={!active ? '#fff' : '#000'}
            d='M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2m11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6zm-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10z'
          />
          <title>Ringer</title>
        </svg>
      );
  }
}

type VolumeStates = 'vibrate' | 'silent' | 'ringer';

export const AndroidVolumeBar = () => {
  const [open, setIsOpen] = useState(true);
  const [showVolStates, setShowVolStates] = useState(false);
  const [activeVolState, setActiveVolState] = useState<VolumeStates>('ringer');
  const timer = useRef<number | null>(null);

  const containerRef = useRef(null);
  useEffect(() => {
    if (!open) return;

    startTimer();
    return () => stopTimer();
  }, [open]);

  function setActiveVolume(vol: VolumeStates) {
    setActiveVolState(vol);
    //TODO:: HACK FOR THE ANIMATION, NEED TO FIX IT
    setTimeout(() => {
      setShowVolStates(false);
      setIsOpen(false);
    }, 120);
  }

  function startTimer() {
    if (timer.current) return;

    timer.current = setTimeout(() => {
      setIsOpen((p) => !p);
      setShowVolStates(false);
    }, 1000);
  }

  function stopTimer() {
    timer.current && clearTimeout(timer.current);
  }

  return (
    <div className='relative'>
      <Head>
        <title>Android Volume Control with Framer Motion</title>
      </Head>
      <div className='flex flex-row justify-center items-center my-4'>
        <button
          type='button'
          onClick={() => {
            setIsOpen((p) => !p);
          }}
          className='bg-blue-500 text-white rounded-full w-32 p-2 text-xl'>
          {open ? 'Hide' : 'Show'}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <div
            className='h-full my-10 absolute'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)' // Center the element
            }}>
            <motion.div
              initial={{ x: window.innerWidth, y: 100 }}
              animate={{
                x: '40%'
              }}
              exit={{ x: window.innerWidth }}
              ref={containerRef}
              onMouseOver={() => {
                stopTimer();
              }}
              onMouseLeave={() => {
                startTimer();
              }}
              className='rounded-full p-1 h-64 w-14 bg-gray-800 flex flex-col relative'>
              <AnimatePresence>
                {showVolStates ? (
                  <motion.div
                    transition={{
                      duration: 0.1
                    }}
                    initial={{
                      y: 20,
                      opacity: 0
                    }}
                    animate={{
                      y: 0,
                      opacity: 1
                    }}
                    exit={{
                      y: 40,
                      opacity: 0
                    }}
                    className='bg-gray-800 p-1 h-36 rounded-full absolute inset-0 -top-20 -z-10'>
                    <div className='h-[132px] bg-gray-700 rounded-full flex flex-col items-center gap-y-1'>
                      <Icon
                        icon={'vibrate'}
                        active={activeVolState === 'vibrate'}
                        onClick={() => setActiveVolume('vibrate')}
                      />

                      <Icon
                        icon={'silent'}
                        active={activeVolState === 'silent'}
                        onClick={() => setActiveVolume('silent')}
                      />

                      <Icon
                        icon={'ringer'}
                        active={activeVolState === 'ringer'}
                        onClick={() => setActiveVolume('ringer')}
                      />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {!showVolStates ? (
                <motion.button
                  // layoutId={`icon-${activeVolState}`}
                  // transition={{
                  //   duration: 0.1,
                  //   type: 'spring',
                  //   bounce: 0,
                  // }}
                  className='bg-blue-200 rounded-full size-12 flex flex-col justify-center items-center text-black'
                  onClick={() => {
                    setShowVolStates((p) => !p);
                  }}>
                  {getVolumeIcon(activeVolState, true)}
                </motion.button>
              ) : null}
              <div className='mt-auto relative'>
                <div className='absolute inset-0 -top-[6.8rem] rounded-full w-1 h-28 bg-blue-200 mx-auto' />
                <motion.div
                  drag='y'
                  dragMomentum={false}
                  dragConstraints={containerRef}
                  dragSnapToOrigin
                  // onDrag={(e, info) => {
                  //   setHeight((prevHeight) => -(prevHeight + info.delta.y));
                  // }}
                  // style={{
                  //   height: height + 'px',
                  // }}
                  className='relative bg-blue-200 size-12 rounded-full flex flex-row justify-center items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='20'
                    viewBox='0 0 24 24'>
                    <path
                      fill='#000'
                      d='M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4v-1.73L19.73 21L21 19.73zM14 7h4V3h-6v5.18l2 2Z'
                    />
                    <title>Music</title>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

function Icon({
  icon,
  onClick,
  active
}: {
  icon: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <motion.button
      // layoutId={`icon-${icon}`}
      className='relative size-10 flex items-center justify-center'
      onClick={onClick}>
      <div className='relative z-10'>{getVolumeIcon(icon, active)}</div>
      {active ? (
        <motion.div
          layoutId='active-bg'
          transition={{
            duration: 0.1
          }}
          className='bg-blue-200 absolute inset-0 rounded-full w-full h-full'
        />
      ) : null}
    </motion.button>
  );
}

export default AndroidVolumeBar;
