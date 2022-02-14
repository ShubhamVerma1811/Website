import { NextApiRequest, NextApiResponse } from 'next';
import Notion from '../../services/notion';

const notion = new Notion();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { page_id } = JSON.parse(req.body);
    const view = await notion.updateViews(page_id);
    res.send(view);
  } else res.send('Request method is not supported');
};

export default handler;
