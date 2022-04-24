import { NextApiRequest, NextApiResponse } from 'next';
import { getNowPlaying } from 'services/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json();

  if (song.item === null) {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(', ');
  const album = song.item.album.name;
  const songUrl = song.item.external_urls.spotify;
  const id = song.item.id;
  const previewUrl = song.item.preview_url;

  return res.status(200).json({
    id,
    album,
    artist,
    isPlaying,
    songUrl,
    title,
    previewUrl,
  });
}
