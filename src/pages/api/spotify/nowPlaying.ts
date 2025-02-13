import { NextApiRequest, NextApiResponse } from 'next';
import { type } from 'os';
import { getNowPlaying } from 'services/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const song = await getNowPlaying();

  if (!song || song.is_playing === false) {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  // @ts-ignore
  const artist = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(', ');
  // @ts-ignore
  const album = song.item.album.name;
  const songUrl = song.item.external_urls.spotify;
  const id = song.item.id;
  // @ts-ignore
  const previewUrl = song.item.preview_url;

  return res.status(200).json({
    id,
    album,
    artist,
    isPlaying,
    songUrl,
    title,
    previewUrl
  });
}
