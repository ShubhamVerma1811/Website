import { Feed } from 'feed';
import type { Blog } from 'types';

export const generateRSSFeed = (blogs: Array<Blog>) => {
  const baseURL = 'https://shubhamverma.me/';

  const author = {
    name: 'Shubham Verma',
    link: 'https://twitter.com/verma__shubham',
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
      rss2: 'https://shubhamverma.me/rss.xml'
    }
  });

  blogs?.forEach((blog) => {
    feed.addItem({
      title: blog.title,
      id: blog.id,
      date: new Date(blog.date),
      link: `${baseURL}blog/${blog.slug}`,
      author: [{ ...author }],
      description: blog.summary,
      image: blog.coverImage
    });
  });

  return feed.rss2();
};
