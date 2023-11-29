'use client';

import { MetaLayout } from 'layouts/MetaLayout';
import { useRef, useState } from 'react';

function generateFakeEncryptedString(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*';
  const charactersLength = characters.length;
  let result = '';
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

const Card = () => {
  const [text, setText] = useState(generateFakeEncryptedString(10 * 1024));

  const textRef = useRef<HTMLParagraphElement>(null);

  function applyStyles(bg: string, clip: string, color: string) {
    if (!textRef.current) {
      return;
    }
    textRef.current.style.background = bg;
    // @ts-ignore
    textRef.current.style['-webkit-background-clip'] = clip;
    // @ts-ignore
    textRef.current.style['-webkit-text-fill-color'] = color;
  }

  function relativeCoords(e: any) {
    var bounds = e.target.getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;
    return { x: x, y: y };
  }

  function handleMoveMove(e: any) {
    if (!textRef.current) {
      return;
    }

    setText(generateFakeEncryptedString(10 * 1024));
    const { x, y } = relativeCoords(e);
    const bounds = e.currentTarget.getBoundingClientRect();

    // reduce the radius at the edges.
    if (
      e.clientX < bounds.left + 10 ||
      e.clientX > bounds.right - 10 ||
      e.clientY < bounds.top + 10 ||
      e.clientY > bounds.bottom - 10
    ) {
      applyStyles(
        `radial-gradient(circle 100px at ${x}px ${y}px, #aff,  #5040ac, #00000010)`,
        `text`,
        `transparent`
      );
      return;
    }

    if (
      e.clientX < bounds.left + 30 ||
      e.clientX > bounds.right - 30 ||
      e.clientY < bounds.top + 30 ||
      e.clientY > bounds.bottom - 30
    ) {
      applyStyles(
        `radial-gradient(circle 150px at ${x}px ${y}px, #aff,  #5040ac, #00000010)`,
        `text`,
        `transparent`
      );
      return;
    }

    applyStyles(
      `radial-gradient(circle 200px at ${x}px ${y}px, #aff,  #5040ac, #00000011)`,
      `text`,
      `transparent`
    );
  }

  return (
    <>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Evervault's Encrypted Card
      </p>
      <MetaLayout title={`Evervault's Encrypted Card | Craft`} />
      <div className='mx-auto flex h-[500px] flex-col rounded-md border  border-gray-700 p-2 md:w-[350px]'>
        <div
          className='relative h-[300px] overflow-clip rounded-md'
          onMouseMove={handleMoveMove}
          onMouseLeave={() => {
            if (!textRef.current) {
              return;
            }

            textRef.current.style.background = 'initial';
            // @ts-ignore
            textRef.current.style['-webkit-background-clip'] = 'initial';
            // @ts-ignore
            textRef.current.style['-webkit-text-fill-color'] = 'initial';
          }}>
          <p
            ref={textRef}
            className='select-none break-all text-[10px] text-transparent transition-all duration-500
              ease-in-out
            '>
            {text}
          </p>

          <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
            <div className='m-auto flex h-36 w-36 items-center justify-center rounded-full bg-skin-primary opacity-90'>
              <p className='select-none font-secondary text-3xl font-semibold italic text-skin-secondary'>
                Ness
              </p>
            </div>
          </div>
        </div>

        <div className='mt-auto p-2'>
          <p className='text-md text-skin-secondary'>
            A points-based health and wellness credit card offering rewards and
            benefits with top brands to incentivize members to spend and live
            healthily.
          </p>

          <p className='text-md my-2 w-max rounded-full border border-gray-500 p-2 text-skin-secondary'>
            PCI Compliance
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
