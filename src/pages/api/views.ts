import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from 'services/sanity-server';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { page_id } = JSON.parse(req.body);
      const doc = await getClient(false).mutate([
        {
          patch: {
            id: page_id,
            inc: {
              views: 1
            }
          }
        }
      ]);
      res.status(200).json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  } else res.send('Request method is not supported');
};

export default handler;
