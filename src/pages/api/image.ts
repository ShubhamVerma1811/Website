import { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import probe from 'probe-image-size';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send(await probe(JSON.parse(req.body).src));
};

export default handler;
