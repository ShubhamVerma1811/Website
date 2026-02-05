import { MDXClient } from 'components/MDXClient';
import { PageLayout } from 'layouts';
import { serialize } from 'next-mdx-remote-client/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeResizeImage from 'rehype-image-resize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { transformer } from 'services/image-transformer';
import { getClient } from 'services/sanity-server';
import { generateMetaData } from 'services/util';

export const metadata = generateMetaData({
  title: 'About | Shubham Verma'
});

async function getData() {
  const about = await getClient().fetch(`*[_type == "about"][0]`);

  const mdxSource = await serialize({
    source: about.body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: 'anchor'
              }
            }
          ],
          rehypeCodeTitles,
          [rehypeResizeImage, { transformer }]
        ]
      }
    }
  });

  return {
    mdxSource
  };
}

export default async function AboutPage() {
  const { mdxSource } = await getData();

  return (
    <PageLayout>
      <div className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:font-secondary prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary prose-li:text-skin-secondary'>
        <MDXClient mdxSource={mdxSource} />
      </div>
    </PageLayout>
  );
}
