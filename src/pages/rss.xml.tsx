import type { GetServerSideProps } from 'next';
import { generateRSSFeed } from 'services/rss';
import { getClient } from 'services/sanity-server';
import type { Blog } from 'types';

const RSS = () => {
  return null;
};

export default RSS;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const blogs: Array<Blog> = await getClient(false).fetch(
    `*[_type == "post"] | order(date desc) {...,"slug": slug.current}`
  );
  const rss = generateRSSFeed(blogs);
  res.setHeader('Content-Type', 'text/xml');
  res.write(rss);
  res.end();

  return { props: {} };
};
