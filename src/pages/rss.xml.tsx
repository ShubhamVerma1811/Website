import { GetServerSideProps } from 'next';
import Notion from 'services/notion';
import { generateRSSFeed } from 'services/rss';

const RSS = () => {
  return null;
};

export default RSS;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const notion = new Notion();
  const blogs = await notion.getPosts();
  const rss = generateRSSFeed(blogs);
  res.setHeader('Content-Type', 'text/xml');
  res.write(rss);
  res.end();

  return { props: {} };
};
