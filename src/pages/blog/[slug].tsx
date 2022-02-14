import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import CodeBlock from '../../blocks/code';
import { BlogLayout, PageLayout } from '../../layouts';
import Notion from '../../services/notion';
import { minutesToRead } from '../../services/read';

const notion = new Notion();

interface IBlog {
  blogInfo: any;
  md: any;
}

const Blog = (props: IBlog) => {
  const [views, setViews] = React.useState<string | number>('--');
  const date = props.blogInfo?.properties?.published?.date?.start;

  const mins = minutesToRead(props.md);

  const sidebar = [
    {
      title: 'Posted',
      info: `${date}`,
      classes: '',
    },
    {
      title: 'Read',
      info: `${mins} min`,
      classes: '',
    },
    {
      title: 'Tags',
      info: props.blogInfo?.properties?.tags?.multi_select?.map((tag: any) => (
        <Link href={`/blog/tag/${tag.name}`} key={tag.id}>
          <a className="prose mr-3 mb-3 border border-gray-700 px-3 py-2 text-white no-underline">
            {tag.name}
          </a>
        </Link>
      )),
      classes: 'hidden lg:block',
    },
    {
      title: 'Views',
      info: views,
      classes: '',
    },
  ];

  useEffect(() => {
    async function views() {
      const res = await fetch('/api/views', {
        method: 'POST',
        body: JSON.stringify({
          page_id: props?.blogInfo?.id,
        }),
      });

      const _views = await res.json();

      setViews(_views);
    }

    views();
  }, []);

  return (
    <PageLayout>
      <BlogLayout>
        <Head>
          <title>
            {props.blogInfo?.properties?.name?.title[0]?.plain_text} | Shubham
            Verma
          </title>
          <meta
            name="description"
            content={
              props.blogInfo?.properties?.subtitle?.rich_text[0]?.plain_text
            }
          />
          <meta
            property="og:image"
            content={props.blogInfo?.properties?.thumbnail?.files[0]?.file?.url}
          />
        </Head>
        <div className="mx-5">
          <div className="lg:grid lg:grid-cols-4">
            <aside className="prose max-w-sm  text-white">
              {sidebar.map((item, index) => (
                <div
                  className={`mb-3 flex flex-row lg:block lg:flex-col ${item?.classes}`}
                  key={index}>
                  <span className="prose mr-2 text-xl text-gray-400">
                    {item.title}
                  </span>
                  <span className="my-1" />
                  <span className="flex flex-wrap">{item.info}</span>
                </div>
              ))}
            </aside>
            <main className="w-full lg:col-span-3">
              <article className="max-w-5xl">
                <h1 className="text-4xl font-normal text-white md:text-5xl">
                  {props.blogInfo?.properties?.name?.title[0]?.plain_text}
                </h1>
                <p className="prose mt-2 text-base text-gray-400">
                  {
                    props.blogInfo?.properties?.subtitle?.rich_text[0]
                      ?.plain_text
                  }
                </p>
                <ReactMarkdown
                  remarkPlugins={[gfm]}
                  className="prose w-full max-w-none overflow-hidden text-white prose-headings:text-white prose-h1:text-4xl prose-h2:mx-0 prose-h2:mt-8 prose-h2:mb-0 prose-h2:text-3xl prose-h2:font-medium prose-p:my-5 prose-p:mx-0 prose-p:text-xl prose-p:font-light prose-a:text-indigo-500 prose-a:underline prose-a:hover:underline prose-blockquote:text-white prose-strong:text-white prose-code:rounded-md prose-code:bg-gray-800 prose-code:p-1 prose-code:font-normal prose-code:text-white prose-code:before:content-none prose-code:after:content-none prose-img:rounded-sm"
                  components={{
                    img: (props: any) => {
                      return (
                        <figure>
                          <img
                            src={props.src}
                            alt={props.alt}
                            className="my-0"
                          />

                          <figcaption>{props.alt}</figcaption>
                        </figure>
                      );
                    },
                    pre: (props: any) => {
                      return <pre className="relative">{props.children}</pre>;
                    },
                    code(props) {
                      return <CodeBlock {...props} />;
                    },
                  }}>
                  {props.md}
                </ReactMarkdown>
              </article>
            </main>
          </div>
        </div>
      </BlogLayout>
    </PageLayout>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await notion.getPosts();

  const paths = posts.results?.map((page: any) => {
    return {
      params: { slug: page?.properties.slug?.rich_text?.[0].plain_text },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug) throw new Error('No slug found in params');

  // Grab the slug from the post URL

  const slug = typeof params.slug === 'string' ? params.slug : params.slug[0];
  // Get all posts from the Notion database
  const posts = await notion.getPosts();

  // Find the post with a matching slug property
  const matchedPost = posts.results.filter((post: any) => {
    if (post?.properties?.slug) {
      return post.properties.slug?.rich_text?.[0].plain_text === slug;
    }
  })[0];

  if (!matchedPost) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const blogInfo = await notion.getPageInfo(matchedPost.id);

  // Get the post's markdown content
  const md = await notion.getMakrkdown(matchedPost.id);

  return {
    props: {
      blogInfo,
      md,
    },
    revalidate: 10,
  };
};
