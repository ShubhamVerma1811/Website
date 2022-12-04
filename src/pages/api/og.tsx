import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge'
};

const font = fetch(
  new URL('../../../public/assets/fonts/Karla/Karla.woff', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontData = await font;

  const { searchParams } = new URL(req.url.replaceAll('&amp%3B', '&'));

  const title = searchParams.has('title')
    ? searchParams.get('title')
    : 'My default title';

  const desc = searchParams.has('desc') ? searchParams.get('desc') : null;
  const img = searchParams.has('img') ? searchParams.get('img') : null;

  const readTime = searchParams.has('readTime')
    ? searchParams.get('readTime')
    : null;
  const date = searchParams.has('date') ? searchParams.get('date') : null;

  return new ImageResponse(
    (
      <div tw='h-full w-full flex flex-col bg-gray-200 items-center relative'>
        <h1 tw='text-7xl font-bold mt-20 mx-20 text-center'>{title}</h1>
        {desc && <p tw='text-3xl font-normal mt-8 mx-20 text-center'>{desc}</p>}
        <p tw='text-xl font-medium mt-6 mx-20 text-center'>
          Shubham Verma {date && `• ${date}`}{' '}
          {readTime && `• ${readTime} min read`}
        </p>
        <div tw='shadow-2xl bg-gray-300 flex absolute bottom-0 rounded-t-3xl w-[900px] h-[400px] overflow-hidden'>
          <img
            tw='overflow-hidden w-[900px] h-[400px]'
            src={img ?? 'https://source.unsplash.com/random'}
            alt={'og-image'}
          />
        </div>
      </div>
    ),
    {
      width: 1600,
      height: 840,
      fonts: [
        {
          name: 'Karla',
          data: fontData,
          style: 'normal'
        }
      ]
    }
  );
}
