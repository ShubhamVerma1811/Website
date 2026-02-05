import { NextResponse } from 'next/server';
import { getNowPlaying } from 'services/spotify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const song = await getNowPlaying();

  if (!song || song.is_playing === false) {
    return NextResponse.json({ isPlaying: false }, { status: 200 });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  // @ts-expect-error
  const artist = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(', ');
  // @ts-expect-error
  const album = song.item.album.name;
  const songUrl = song.item.external_urls.spotify;
  const id = song.item.id;
  // @ts-expect-error
  const previewUrl = song.item.preview_url;

  return NextResponse.json(
    {
      id,
      album,
      artist,
      isPlaying,
      songUrl,
      title,
      previewUrl
    },
    { status: 200 }
  );
}
