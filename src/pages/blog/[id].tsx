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
  const date = new Date(props.blogInfo?.properties?.created?.created_time);
  return (
    <div className="mx-5">
      <Link href="/blog">
        <a>
          <h1 className="prose text-white">BLOGS</h1>
        </a>
      </Link>
      <h1 className="text-center text-4xl font-extrabold uppercase text-white lg:text-7xl">
        {props.blogInfo?.properties?.name?.title[0]?.plain_text}
      </h1>
      <div className="lg:grid lg:grid-cols-4">
        <aside className="prose max-w-sm border border-white text-white">
          <p>
            Published on {date.getDate()}/{date.getMonth() + 1}/
            {date.getFullYear()}
          </p>
          {props.blogInfo?.properties?.tags?.multi_select?.map((tag: any) => (
            <Link href={`/tag/${tag.name}`}>
              <a className="border border-white text-white" key={tag.id}>
                {tag?.name}
              </a>
            </Link>
          ))}
        </aside>
        <main className="w-full lg:col-span-3">
          <article className="max-w-5xl">
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
              className="prose w-full max-w-none text-white prose-headings:text-white prose-a:text-white prose-blockquote:not-italic prose-blockquote:text-white prose-strong:text-white
        prose-code:text-white prose-code:before:content-none prose-code:after:content-none prose-ul:text-white prose-li:text-white"
              components={{
                img: (props: any) => {
                  return (
                    <figure>
                      <img src={props.src} alt={props.alt} className="my-0" />
                      <figcaption>{props.alt}</figcaption>
                    </figure>
                  );
                },
              }}>
              {props.md}
            </ReactMarkdown>
          </article>
        </main>
      </div>
      <div></div>
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
