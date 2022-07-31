import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { slug } = req.body;
      const token = req.headers[process.env.SANITY_WEBHOOK_SECRET_HEADER!];
      if (token !== process.env.SANITY_WEBHOOK_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      await Promise.all([
        res.revalidate('/'),
        res.revalidate('/blog'),
        res.revalidate(`/blog/${slug}`)
      ]);
      return res.status(200).json({ message: `Updated ${slug}` });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  } else res.status(400).send('Request method is not supported');
};

export default handler;
