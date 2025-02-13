import { NextApiRequest, NextApiResponse } from 'next';
import { getRecentlyPlayed } from 'services/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const tracks = await getRecentlyPlayed();
    res.status(200).json(tracks.slice(0, 10));
  } catch (error) {
    console.error('Error in recently-played API:', error);
    res.status(500).json({ message: 'Failed to fetch recently played tracks' });
  }
}
