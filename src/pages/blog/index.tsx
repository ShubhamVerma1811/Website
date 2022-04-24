import { Blogs } from 'components';
import { PageLayout } from 'layouts';
import { InferGetStaticPropsType } from 'next';
import { memo } from 'react';
import Notion from 'services/notion';

const Blog = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Blogs blogs={blogs} />
    </PageLayout>
  );
};

export default memo(Blog);

export const getStaticProps = async () => {
  const notion = new Notion();
  const blogs = await notion.getPosts();

  return {
    props: {
      blogs,
    },
    revalidate: 10,
  };
};
