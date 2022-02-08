import { GetStaticProps } from 'next';
import Head from 'next/head';
import BlogsBlock from '../../blocks/blogs';
import { PageLayout } from '../../layouts';
import Notion from '../../services/notion';

const notion = new Notion();

interface IBlog {
  pageInfo: any;
  database: any;
}

const Blog = (props: IBlog) => {
  // @ts-ignore
  return (
    <PageLayout>
      <Head>
        <title>Blog | Shubham Verma</title>
        <meta name="description" content="Blogs by Shubham Verma" />
      </Head>
      <div className="mx-9 mt-20  lg:mt-36 lg:grid lg:grid-cols-4">
        <div>
          <h1 className="prose mb-6 text-4xl text-white lg:mb-auto">Blog</h1>
        </div>

        <main className="max-w-max lg:col-span-3">
          {props.database.results.map((page: any) => {
            return <BlogsBlock {...page} />;
          })}
        </main>
      </div>
    </PageLayout>
  );
};

export default Blog;

// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const database = await notion.getPosts();

  return {
    props: {
      database,
    },
    revalidate: 10,
  };
};
