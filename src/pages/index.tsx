import { Hero, ProjectsSection, RecentBlogSection } from 'components';
import { TalksSection } from 'components/Talks';
import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React, { memo } from 'react';
import { getClient } from 'services/sanity-server';
import { Blog, Project, Talk } from 'types';

const Home = ({
  blogs,
  projects,
  talks
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <React.Fragment>
      <PageLayout>
        <MetaLayout
          title='Shubham Verma | Frontend Developer'
          description='Frontend Developer, Likes to build open source tools and write articles. '
          image_url={`${process.env.DOMAIN}/api/og?title=Shubham Verma&desc=Builder, Writer, Learner.`}
        />
        <Hero />
        <RecentBlogSection blogs={blogs} />
        <ProjectsSection projects={projects} />
        <TalksSection talks={talks} />
      </PageLayout>
    </React.Fragment>
  );
};

export default memo(Home);

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const blogs: Array<Blog> = await getClient(preview).fetch(
    `*[_type == "post" && defined(views)] | order(views desc) [0...3] {..., "slug": slug.current,"readTime": round(length(body) / 5 / 180 )}`
  );

  const projects: Array<Project> = await getClient(preview).fetch(
    `*[_type == "project"]`
  );

  const talks: Array<Talk> = await getClient(preview).fetch(
    `*[_type == "talk"] {..., "id": _id}`
  );

  return {
    props: {
      blogs,
      projects,
      talks
    },
    revalidate: 60 * 60 * 24
  };
};
