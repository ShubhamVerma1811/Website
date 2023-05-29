import { MDXClient } from 'components/MDXClient';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { getClient } from 'services/sanity-server';

export const metadata = {
  title: 'Uses | Shubham Verma',
  description: 'Tools and Softwares I use on daily basis.',
  openGraph: {
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Uses | Shubham Verma`
      }
    ]
  }
};

const getData = async () => {
  const uses = await getClient().fetch(`*[_type == "uses"]`);

  if (!uses) {
    return {
      props: {},
      notFound: true
    };
  }

  const md = await serialize(uses[0]?.body, {
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
        ]
      ]
    }
  });

  return {
    md,
    notFound: false
  };
};

const Uses = async () => {
  const { md } = await getData();
  return (
    <>
      {md && (
        <div className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:font-secondary prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary [&>ul>li>p]:my-0'>
          <MDXClient mdxSource={md} />
        </div>
      )}
    </>
  );
};

export default Uses;
