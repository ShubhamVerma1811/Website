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
  const readTime = searchParams.has('readTime')
    ? searchParams.get('readTime')
    : null;
  const date = searchParams.has('date') ? searchParams.get('date') : null;

  return new ImageResponse(
    (
      <div tw='flex flex-col bg-black font-bold w-full h-screen p-12'>
        <p tw='text-gray-300'>
          {date && date}
          {readTime && ` • ${readTime} min read`}
        </p>
        <h1 tw='m-0 my-auto text-gray-300 font-bold text-4xl'>{title}</h1>
        <p tw='text-gray-300'>shbm.fyi</p>
      </div>
    ),
    {
      width: 800,
      height: 400,
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
