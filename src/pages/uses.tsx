import { PageLayout } from 'layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { getClient } from 'services/sanity-server';

const Uses = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <React.Fragment>
      <Head>
        <title>Uses | Shubham Verma</title>
        <meta
          name='description'
          content='Tools and Softwares I use on daily basis.'
        />
      </Head>
      <PageLayout>
        {props.md && (
          <div className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary [&>ul>li>p]:my-0'>
            <MDXRemote {...props.md} />
          </div>
        )}
      </PageLayout>
    </React.Fragment>
  );
};

export default Uses;

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const uses = await getClient(preview).fetch(`*[_type == "uses"]`);

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
    props: {
      md
    },
    notFound: false
  };
};
