import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const font = fetch(
  new URL('../../../../public/assets/fonts/Karla/Karla.woff', import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') ?? 'My default title';
  const desc = searchParams.get('desc') ?? null;
  const img = searchParams.get('img') ?? null;
  const readTime = searchParams.get('readTime') ?? null;
  const date = searchParams.get('date') ?? null;
  const author = searchParams.get('author') ?? null;

  const fontData = await font;

  return new ImageResponse(
    (
      <div tw='h-full w-full flex flex-col bg-gray-200 items-center relative'>
        <h1 tw='text-7xl font-bold mt-20 mx-20 text-center'>{title}</h1>
        {desc && <p tw='text-3xl font-normal mt-8 mx-20 text-center'>{desc}</p>}
        <p tw='text-xl font-medium mt-6 mx-20 text-center'>
          {author && `By ${author}`} {date && `• ${date}`}{' '}
          {readTime && `• ${readTime} min read`}
        </p>
        <div tw='shadow-2xl bg-gray-300 flex absolute bottom-0 rounded-t-3xl w-[900px] h-[400px] overflow-hidden'>
          {/** biome-ignore lint/performance/noImgElement: og route wont work with Next Image*/}
          <img
            tw='overflow-hidden w-[900px] h-[400px]'
            src={
              img ??
              'https://images.unsplash.com/photo-1444065707204-12decac917e8?fit=crop&h=400&&w=900'
            }
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
