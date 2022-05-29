import CodeBlock from 'blocks/code';
import { DiagonalArrow } from 'components';
import { BlogLayout, PageLayout } from 'layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React, { memo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Notion from 'services/notion';

const Blog = ({ blog }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [views, setViews] = React.useState<string | number>('--');

  useEffect(() => {
    // @ts-ignore
    setViews(blog?.views);
  }, [blog?.views]);

  useEffect(() => {
    async function views() {
      await fetch('/api/views', {
        method: 'POST',
        body: JSON.stringify({
          page_id: blog?.id,
        }),
      });
    }

    process.env.NODE_ENV === 'production' && views();
  }, []);

  if (!blog) return null;

  return (
    <PageLayout>
      <BlogLayout blog={blog}>
        <Head>
          <title>{blog?.title} | Shubham Verma</title>
          <meta name='description' content={blog?.description} />

          {blog?.canonicalUrl && (
            <link rel='canonical' href={blog?.canonicalUrl} />
          )}
          <meta name='author' content='Shubham Verma' />

          {/* <!-- Twitter Card data --> */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@verma__shubham' />
          <meta name='twitter:title' content={blog?.title} />
          <meta name='twitter:description' content={blog?.description} />
          <meta name='twitter:creator' content='@verma__shubham' />
          {blog?.thumbnail && (
            <meta name='twitter:image' content={blog?.thumbnail} />
          )}
          <meta name='twitter:image:alt' content={blog?.description} />
          {/* <!-- Open Graph data --> */}
          <meta property='og:title' content={blog?.title} />
          <meta property='og:type' content='article' />
          {blog?.thumbnail && (
            <meta property='og:image' content={blog?.thumbnail} />
          )}
          <meta property='og:image:alt' content={blog?.description} />
          <meta property='og:description' content={blog?.description} />
        </Head>

        <p className='mb-3 text-4xl font-bold text-skin-secondary'>
          {blog?.title}
        </p>

        <p className='my-1 text-gray-400'>
          {blog?.publishedAt} <span className='mx-3'>•</span> {views} views{' '}
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
                properties: {
                  className: 'anchor',
                },
              },
            ],
            rehypeCodeTitles,
          ]}
          className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary prose-li:text-skin-secondary'
          components={{
            blockquote: (props) => (
              <blockquote className='prose text-skin-secondary'>
                {props.children}
              </blockquote>
            ),
            pre: (props: any) => {
              return <pre className='relative p-0'>{props.children}</pre>;
            },
            code(props) {
              return <CodeBlock {...props} />;
            },
            img: (props) => {
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
            },
          }}>
          {/* @ts-ignore */}
          {blog?.markdown}
        </ReactMarkdown>
      </BlogLayout>
    </PageLayout>
  );
};

export default memo(Blog);

export const getStaticPaths = async () => {
  const notion = new Notion();
  const blogs = await notion.getPosts();
  const paths = blogs?.map((blog) => {
    return {
      params: { slug: blog.slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params || !params.slug) throw new Error('No slug found in params');
  const notion = new Notion();

  const slug = typeof params.slug === 'string' ? params.slug : params.slug[0];
  const blogs = await notion.getPosts();
  const matchedPost = blogs?.filter((blog) => {
    if (blog.publicationUrl) return;
    if (blog?.slug) {
      return blog.slug === slug;
    }
  })[0];

  if (!matchedPost) {
    return {
      props: { blog: null },
      notFound: true,
      revalidate: 10,
    };
  }

  const blog = await notion.getPageInfo(matchedPost.id);

  return {
    props: {
      blog,
    },
    notFound: false,
    revalidate: 10,
  };
};
