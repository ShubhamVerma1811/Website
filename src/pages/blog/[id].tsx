import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import gfm from 'remark-gfm';
import Notion from '../../services/notion';

const notion = new Notion();

interface IBlog {
  blogInfo: any;
  md: any;
}

const Blog = (props: IBlog) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Link href="/blog">
        <a>
          <h1 className="prose text-white">BLOGS</h1>
        </a>
      </Link>
      <h1 className="text-center text-4xl font-extrabold uppercase text-white lg:text-7xl">
        {props.blogInfo?.properties?.name?.title[0]?.plain_text}
      </h1>
      <ReactMarkdown
        remarkPlugins={[
          [
            gfm,
            {
              fencedCodeBlocks: true,
              inlineCodeMarker: '`',
            },
          ],
          rehypeHighlight,
        ]}
        className="prose text-white prose-headings:text-white prose-a:text-white prose-blockquote:text-white prose-code:text-white prose-ul:text-white prose-li:text-white">
        {props.md}
      </ReactMarkdown>
    </div>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await notion.getPosts('914232ab-7e40-448b-bfc4-ddade4d4ccde');

  const paths = posts.results?.map((page) => ({
    params: {
      id: page.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) throw new Error('No id found in params');

  const id = typeof params.id === 'string' ? params.id : params.id[0];

  const blogInfo = await notion.getPageInfo(id);

  const md = await notion.getMakrkdown(id);

  return {
    props: {
      blogInfo,
      md,
    },
    revalidate: 10,
  };
};
