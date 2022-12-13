import { Feed, Item } from 'feed';
import type { Blog } from 'types';
import { TWITTER_URL } from './constants';

export const generateRSSFeed = (blogs: Array<Blog>) => {
  const baseURL = process.env.DOMAIN!;

  const author = {
    name: 'Shubham Verma',
    link: TWITTER_URL,
    email: 'hi@shubhamverma.me'
  };

  const feed = new Feed({
    title: 'Blogs by Shubham Verma',
    description:
      'I blog about open source tools, writing blogs on problems and solutions faced by developers, and other stuff.',
    id: baseURL,
    link: baseURL,
    language: 'en',
    author,
    copyright: `Copyright © ${new Date().getFullYear()} Shubham Verma`,
    feedLinks: {
      rss2: `${baseURL}/rss.xml`
    }
  });

  blogs?.forEach((blog) => {
    const d = new Date(blog.date);
    const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    const cover = `${baseURL}/api/og?title=${blog.title}&amp;readTime=${blog.readTime}&amp;date=${date}`;

    const item: Item = {
      title: blog.title,
      id: blog.id,
      date: new Date(blog.date),
      link: `${baseURL}/blog/${blog.slug}`,
      author: [{ ...author }],
      description: blog.summary,
      image: cover,
      content: blog.body,
      published: new Date(blog.date),
    };

    feed.addItem(item);
  });

  return feed.rss2();
};
