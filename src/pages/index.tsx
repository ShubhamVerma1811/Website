import { Hero, ProjectsSection, RecentBlogSection } from 'components';
import { PageLayout } from 'layouts';
import { InferGetStaticPropsType } from 'next';
import { memo } from 'react';
import Notion from 'services/notion';

const Home = ({
  blogs,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Hero />
      <RecentBlogSection
        blogs={blogs.sort((a, b) => b.views - a.views).slice(0, 3)}
      />
      <ProjectsSection projects={projects} />
    </PageLayout>
  );
};

export default memo(Home);

export const getStaticProps = async () => {
  const notion = new Notion();
  const blogs = await notion.getPosts();
  const projects = await notion.getProjects();

  return {
    props: {
      blogs,
      projects,
    },
    revalidate: 120,
  };
};
