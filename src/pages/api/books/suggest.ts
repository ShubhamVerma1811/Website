import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from 'services/sanity-server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { title, authors, reason } = req.body;

    const doc = await getClient(false).mutate([
      {
        create: {
          _type: 'book',
          title,
          authors,
          reason
        }
      }
    ]);

    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}
