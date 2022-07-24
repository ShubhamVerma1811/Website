import { globby } from 'globby';
import { GetServerSideProps } from 'next';
import prettier from 'prettier';
import Notion from 'services/notion';

const generate = async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'src/pages/**/*.tsx',
    'src/pages/blog/index.tsx',
    '!src/pages/_*.tsx',
    '!src/pages/blog/[slug].tsx',
    '!src/pages/404',
    '!src/pages/404.tsx',
    '!src/pages/sitemap.xml.tsx',
    '!src/pages/rss.xml.tsx',
  ]);

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
            const path = page
              .replace('src/pages', '')
              .replace('.js', '')
              .replace('.mdx', '')
              .replace('.tsx', '')
              .replace('.ts', '')
              .replace('.md', '')
              .replace('.jsx', '');
            const route = path.endsWith('/index')
              ? path.replace('/index', '')
              : path;

            return `
              <url>
                  <loc>${`https://shubhamverma.me${route}`}</loc>
              </url>
            `;
          })
          .join('')}


    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
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
