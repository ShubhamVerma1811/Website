import { Hero, ProjectsSection, RecentBlogSection } from 'components';
import { PageLayout } from 'layouts';
import type { InferGetStaticPropsType } from 'next';
import { memo } from 'react';
import { getClient } from 'services/sanity-server';
import type { Blog, Project } from 'types';

const Home = ({
  blogs,
  projects
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Hero />
      <RecentBlogSection blogs={blogs} />
      <ProjectsSection projects={projects} />
    </PageLayout>
  );
};

export default memo(Home);

export const getStaticProps = async () => {
  const blogs: Array<Blog> = await getClient(false).fetch(
    `*[_type == "post" && defined(views)] | order(views desc) [0...3] {..., "slug": slug.current}`
  );

  const projects: Array<Project> = await getClient(false).fetch(
    `*[_type == "project"]`
  );

  return {
    props: {
      blogs,
      projects
    },
    revalidate: 120
  };
};
