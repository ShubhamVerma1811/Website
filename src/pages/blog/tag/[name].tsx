import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import BlogsBlock from '../../../blocks/blogs';
import { PageLayout } from '../../../layouts';
import Notion from '../../../services/notion';

const Tag = (props: any) => {
  return (
    <PageLayout>
      <Head>
        <title>Blog | Shubham Verma</title>
        <meta name="description" content="Blogs by Shubham Verma" />
      </Head>
      <div className="mx-5 mt-20 lg:mx-auto lg:mt-36 lg:grid lg:grid-cols-4">
        <div>
          <h1 className="prose mb-6 text-4xl text-white lg:mb-auto">
            <Link href="/blog">
              {/* tailwind className to animate underline on hover */}
              <a className="text-white underline">Blog</a>
            </Link>
            <span className="capitalize"> / {props.tag}</span>
          </h1>
        </div>

        <main className="max-w-max lg:col-span-3">
          {props.posts?.results?.map((page: any) => {
            return <BlogsBlock {...page} />;
          })}
        </main>
      </div>
    </PageLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const notion = new Notion();

  if (!params || !params.name) throw new Error('No name found in params');

  const posts = await notion.getPostsByTagName(params.name as string);

  if (!posts.results.length) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      posts,
      tag: params.name,
      revalidaion: 10,
    },
  };
};

export default Tag;
