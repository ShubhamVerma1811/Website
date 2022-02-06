import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
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
      <div className="h-48" />
      <Link href="/blog">
        <a>
          <h1 className="prose text-white">BLOGS</h1>
        </a>
      </Link>

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
            <h1 className="text-4xl font-normal text-white md:text-5xl">
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
              className="prose w-full max-w-none text-white prose-headings:text-white prose-h1:text-4xl prose-h2:mx-0 prose-h2:mt-8 prose-h2:mb-0 prose-h2:text-3xl prose-h2:font-medium prose-p:my-5 prose-p:mx-0 prose-p:text-xl prose-p:font-light prose-a:text-blue-500 prose-a:underline prose-a:hover:underline prose-blockquote:text-white prose-strong:text-white prose-code:font-normal prose-code:text-gray-400 prose-code:before:content-none prose-code:after:content-none
              "
              components={{
                img: (props: any) => {
                  return (
                    <figure>
                      <img src={props.src} alt={props.alt} className="my-0" />

                      <figcaption>{props.alt}</figcaption>
                    </figure>
                  );
                },
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={nord}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ fontFamily: '"Fira Code", "monospace"' }}
                      showLineNumbers
                      wrapLines
                      {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}>
              {props.md}
            </ReactMarkdown>
          </article>
        </main>
      </div>
      <div className="h-48" />
      <button
        className="border-text-white fixed right-5 bottom-5 h-12 w-12 rounded-full border bg-gray-900 text-white shadow"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}>
        Top
      </button>
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
