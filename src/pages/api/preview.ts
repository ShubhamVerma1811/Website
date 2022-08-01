import type { NextApiRequest, NextApiResponse } from 'next';
import { previewClient } from 'services/sanity-server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const post = await previewClient.fetch(
    `*[_type == "post" && !defined(publicationUrl) && slug.current == "${req.query.slug}"][0] {...,"id": _id, "slug": slug.current}`
  );

  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({});
  res.writeHead(307, { Location: `/blog/${post.slug}` });
  res.end();
}
