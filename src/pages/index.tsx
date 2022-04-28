import { Hero, RecentBlogSection } from 'components';
import { PageLayout } from 'layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { memo } from 'react';
import Notion from 'services/notion';

const Home = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Hero />
      <RecentBlogSection
        blogs={blogs.sort((a, b) => b.views - a.views).slice(0, 3)}
      />
    </PageLayout>
  );
};

export default memo(Home);

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const notion = new Notion();
  const blogs = await notion.getPosts();

  return {
    props: {
      blogs,
    },
    revalidate: 120,
  };
};
