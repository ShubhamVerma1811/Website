import { DiagonalArrow } from 'components';
import BlogViewIncrement from 'components/BlogViewIncrement';
import { MDXClient } from 'components/MDXClient';
import { BlogLayout } from 'layouts';
import { Metadata, ResolvingMetadata } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeResizeImage from 'rehype-image-resize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { transformer } from 'services/image-transformer';
import { getClient } from 'services/sanity-server';
import type { Blog as IBlog } from 'types';

export const revalidate = 86400;

export async function generateStaticParams() {
  const blogs: Array<IBlog> = await getClient().fetch(
    `*[_type == "post"] | order(date desc) {"slug":slug.current}`
  );

  return blogs?.map(({ slug }) => slug);
}

async function getData(params: { slug: string }) {
  if (!params || !params.slug) throw new Error('No slug found in params');

  const slug = typeof params.slug === 'string' ? params.slug : params.slug[0];
  const blog: IBlog = await getClient().fetch(
    `*[_type == "post" && !defined(publicationUrl) && slug.current == "${slug}"][0] {...,"id": _id, "slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
  );

  if (!blog) {
    return {
      props: { blog: null }
    };
  }

  const mdxSource = await serialize(blog.body, {
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
        // rehypeImageBlur
      ]
    }
  });

  return {
    props: {
      blog,
      mdxSource
    }
  };
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {
    props: { blog }
  } = await getData(params);

  if (!blog) return {};

  const d = new Date(blog.date);
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  return {
    title: blog?.title,
    description: blog?.summary,
    openGraph: {
      title: blog?.title,
      description: blog?.summary,
      images: {
        url: `${process.env.DOMAIN}api/og?title=${blog?.title}&date=${date}&readTime=${blog?.readTime}&author=Shubham Verma&desc=${blog?.summary}`
      }
    }
  };
}

async function Blog({ params }: { params: { slug: string } }) {
  const {
    props: { blog, mdxSource }
  } = await getData(params);

  if (!blog) return null;

  const d = new Date(blog.date);
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  });

  return (
    <BlogLayout blog={blog}>
      <p className='mb-3 font-secondary text-4xl font-bold text-skin-secondary'>
        {blog?.title}
      </p>

      <p className='my-1 text-gray-400'>
        {date} <span className='mx-3'>•</span>
        {formatter.format(blog.views)} views <span className='mx-3'>•</span>
        {blog?.readTime} min read
        {blog?.canonicalUrl && (
          <React.Fragment>
            <span className='mx-3'>•</span> Originally published on{' '}
            <a className='text-skin-accent' href={blog?.canonicalUrl}>
              {new URL(blog.canonicalUrl).hostname}
              <DiagonalArrow className='inline' />
            </a>
          </React.Fragment>
        )}
      </p>
      <hr className='my-4 border-skin-primary-muted' />
      <div className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:font-secondary prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary prose-li:text-skin-secondary'>
        <MDXClient mdxSource={mdxSource} />
      </div>

      <BlogViewIncrement id={blog?.id} />
    </BlogLayout>
  );
}

export default Blog;
