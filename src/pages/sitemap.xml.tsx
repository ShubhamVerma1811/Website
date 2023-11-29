import type { GetServerSideProps } from 'next';
import prettier from 'prettier';
import { DOMAIN } from 'services/constants';
import { getClient } from 'services/sanity-server';
import type { Blog } from 'types';

const generate = async (preview: boolean) => {
  const prettierConfig = await prettier.resolveConfig('../../.prettierrc');
  const pages = ['', 'blog', 'spotify', 'socials', 'work', 'craft'];

  const blogs: Array<Blog> = await getClient(preview).fetch(
    `*[_type == "post"] | order(date desc) {"slug": slug.current}`
  );

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${blogs
          .map((blog) => {
            return `
              <url>
                  <loc>${`${DOMAIN}/blog/${blog.slug}`}</loc>
              </url>
            `;
          })
          .join('')}
        ${pages
          .map((page) => {
            return `
              <url>
                  <loc>${`${DOMAIN}/${page}`}</loc>
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

export const getServerSideProps: GetServerSideProps = async ({
  res,
  preview = false
}) => {
  res.setHeader('Content-Type', 'text/xml');
  const posts = await generate(preview);
  res.write(posts);
  res.end();

  return { props: {} };
};
