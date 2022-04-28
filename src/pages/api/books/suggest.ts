import { NextApiRequest, NextApiResponse } from 'next';
import Notion from 'services/notion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { title, authors, reason } = req.body;

    const notion = new Notion();
    await notion.createBookSuggestion(title, authors, reason);

    res.send('OK');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}
