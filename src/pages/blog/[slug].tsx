import CodeBlock from 'blocks/code';
import { DiagonalArrow } from 'components';
import { BlogLayout, PageLayout } from 'layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
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

  return (
    <PageLayout>
      <BlogLayout>
        <p className="text-3xl text-skin-secondary">{blog?.title}</p>

        <p className="my-1 text-gray-400">
          {blog?.publishedAt} <span className="mx-3">•</span> {views} views{' '}
          <span className="mx-3">•</span>
          {blog?.readTime} min read
          {blog?.canonicalUrl && (
            <React.Fragment>
              <span className="mx-3">•</span> Originally published on{' '}
              <a className="text-skin-accent" href={blog?.canonicalUrl}>
                {new URL(blog.canonicalUrl).hostname}
                <DiagonalArrow className="inline" />
              </a>
            </React.Fragment>
          )}
        </p>
        <hr className="my-4 border-skin-primary-muted" />
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeCodeTitles]}
          className="prose max-w-none text-lg text-skin-secondary prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary prose-li:text-skin-secondary"
          components={{
            blockquote: (props) => (
              <blockquote className="prose text-skin-secondary">
                {props.children}
              </blockquote>
            ),
            pre: (props: any) => {
              return <pre className="relative p-0">{props.children}</pre>;
            },
            code(props) {
              return <CodeBlock {...props} />;
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
