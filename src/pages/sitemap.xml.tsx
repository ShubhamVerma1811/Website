import type { GetServerSideProps } from 'next';
import prettier from 'prettier';
import { getClient } from 'services/sanity-server';
import type { Blog } from 'types';

const generate = async () => {
  const prettierConfig = await prettier.resolveConfig('../../.prettierrc');
  const pages = ['/', '/blog', '/books', '/colophon', '/spotify', '/uses'];

  const blogs: Array<Blog> = await getClient(false).fetch(
    `*[_type == "post"] | order(date desc) {...,"slug": slug.current}`
  );

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
