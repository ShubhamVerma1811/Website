'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { getClient } from 'services/sanity-server';

async function getData() {
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
    md
  };
}

const Uses = async () => {
  const { md } = await getData();

  return (
    <React.Fragment>
      {md && (
        <div className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:font-secondary prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary [&>ul>li>p]:my-0'>
          <MDXRemote {...md} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Uses;
