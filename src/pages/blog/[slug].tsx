import CodeBlock from 'blocks/code';
import { DiagonalArrow } from 'components';
import { BlogLayout, PageLayout } from 'layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/future/image';
import React, { memo, useEffect } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeResizeImage from 'rehype-image-resize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { transformer } from 'services/image-transformer';
import { getClient } from 'services/sanity-server';
import type { Blog as IBlog } from 'types';

const Blog = ({
  blog,
  mdxSource
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [views, setViews] = React.useState<string | number>('--');

  useEffect(() => {
    blog && setViews(blog?.views);
  }, [blog?.views]);

  useEffect(() => {
    async function views() {
      await fetch('/api/views', {
        method: 'POST',
        body: JSON.stringify({
          page_id: blog?.id
        })
      });
    }

    process.env.NODE_ENV === 'production' && views();
  }, []);

  if (!blog) return null;

  const d = new Date(blog.date);
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  return (
    <PageLayout>
      <BlogLayout blog={blog}>
        <p className='mb-3 text-4xl font-bold text-skin-secondary'>
          {blog?.title}
        </p>

        <p className='my-1 text-gray-400'>
          {date} <span className='mx-3'>•</span> {views} views{' '}
          <span className='mx-3'>•</span>
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
        <div className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary prose-li:text-skin-secondary'>
          <MDXRemote
            {...mdxSource}
            components={{
              blockquote: (props) => (
                <blockquote className='prose text-skin-secondary'>
                  {props.children}
                </blockquote>
              ),
              pre: (props: any) => {
                return (
                  <pre className='relative m-0 rounded-t-none p-0'>
                    {props.children}
                  </pre>
                );
              },
              code(props) {
                return <CodeBlock {...props} />;
              },
              img: (props) => {
                if (!props.src) return null;
                if (!props.width || !props.height) {
                  // Fallback until I migrate all images to new syntax in the markdown.
                  return (
                    <figure>
                      <img
                        src={props.src}
                        alt={props.alt}
                        className='my-0 rounded-md'
                      />
                      <figcaption>{props.alt}</figcaption>
                    </figure>
                  );
                }
                return (
                  <figure>
                    <Image
                      className='rounded-sm'
                      src={props.src}
                      alt={props.alt || ''}
                      title={props.alt || ''}
                      width={props.width}
                      height={props.height}
                    />
                    <figcaption>{props.alt}</figcaption>
                  </figure>
                );
              },
              div: (props) => {
                if (props.className === 'rehype-code-title') {
                  // @ts-ignore
                  const lang = props.children?.split('.').pop();
                  if (!lang) return null;
                  return (
                    <div className='mt-2 flex items-center rounded-t-lg bg-[#1f2937] px-1 py-2'>
                      <Image
                        className='my-0 mx-2 inline'
                        src={`/assets/logos/${lang}.svg`}
                        alt={lang}
                        width={16}
                        height={16}
                      />
                      <div className='text-white'>{props.children}</div>
                    </div>
                  );
                }

                return <div {...props} />;
              }
            }}
          />
        </div>
      </BlogLayout>
    </PageLayout>
  );
};

export default memo(Blog);

export const getStaticPaths = async ({
  preview = false
}: GetStaticPropsContext) => {
  const blogs: Array<IBlog> = await getClient(preview).fetch(
    `*[_type == "post"] | order(date desc) {"slug":slug.current}`
  );

  const paths = blogs?.map(({ slug }) => {
    return {
      params: { slug }
    };
  });

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({
  params,
  preview = false
}: GetStaticPropsContext) => {
  if (!params || !params.slug) throw new Error('No slug found in params');

  const slug = typeof params.slug === 'string' ? params.slug : params.slug[0];
  const blog: IBlog = await getClient(preview).fetch(
    `*[_type == "post" && !defined(publicationUrl) && slug.current == "${slug}"][0] {...,"id": _id, "slug": slug.current}`
  );

  if (!blog) {
    return {
      props: { blog: null },
      notFound: true
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
      ]
    }
  });

  return {
    props: {
      blog,
      mdxSource
    },
    notFound: false,
    revalidate: 60 * 60 * 24
  };
};
