import { GetServerSideProps } from 'next';
import prettier from 'prettier';
import Notion from 'services/notion';

const generate = async () => {
  const prettierConfig = await prettier.resolveConfig('../../.prettierrc');
  const pages = ['/', '/blog', '/books', '/colophon', '/spotify', '/uses'];

  const notion = new Notion();
  const blogs = await notion.getPosts();

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${blogs
          .map((blog) => {
            return `
              <url>
                  <loc>${`https://shubhamverma.me/blog/${blog.slug}`}</loc>
              </url>
            `;
          })
          .join('')}
        ${pages
          .map((page) => {
            return `
              <url>
                  <loc>${`https://shubhamverma.me${page}`}</loc>
              </url>
            `;
          })
          .join('')}


    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  // eslint-disable-next-line no-sync
  return formatted;
};

const Sitemap = () => {
  return null;
};

export default Sitemap;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml');
  const posts = await generate();
  res.write(posts);
  res.end();

  return { props: {} };
};
