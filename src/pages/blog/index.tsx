import { BlogCard } from 'components';
import { PageLayout } from 'layouts';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { memo } from 'react';
import Notion from 'services/notion';

const Blog = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Head>
        <title>Blogs | Shubham Verma</title>
        <meta name='description' content='Blogs by Shubham Verma' />
      </Head>
      <p className='mb-6 text-4xl font-bold text-skin-secondary'>Blogs</p>

      {blogs?.map((blog, index) => {
        return <BlogCard key={index} blog={blog} />;
      })}
    </PageLayout>
  );
};

export default memo(Blog);

export const getStaticProps = async () => {
  const notion = new Notion();
  const blogs = await notion.getPosts();

  return {
    props: {
      blogs
    },
    revalidate: 10
  };
};
