import type { GetServerSideProps } from 'next';
import { generateRSSFeed } from 'services/rss';
import { getClient } from 'services/sanity-server';
import type { Blog } from 'types';

const RSS = () => {
  return null;
};

export default RSS;

export const getServerSideProps: GetServerSideProps = async ({
  res,
  preview = false
}) => {
  const blogs: Array<Blog> = await getClient(preview).fetch(
    `*[_type == "post"] | order(date desc) {...,"slug": slug.current, "id": _id, "readTime": round(length(body) / 5 / 180 )}`
  );
  const rss = generateRSSFeed(blogs);
  res.setHeader('Content-Type', 'text/xml');
  res.write(rss);
  res.end();

  return { props: {} };
};
