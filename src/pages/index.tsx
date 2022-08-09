import { Hero, ProjectsSection, RecentBlogSection } from 'components';
import { PageLayout } from 'layouts';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React, { memo } from 'react';
import { getClient } from 'services/sanity-server';
import type { Blog, Project } from 'types';

const Home = ({
  blogs,
  projects
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <React.Fragment>
      <Head>
        <title>Shubham Verma | Frontend Developer</title>
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <PageLayout>
        <Hero />
        <RecentBlogSection blogs={blogs} />
        <ProjectsSection projects={projects} />
      </PageLayout>
    </React.Fragment>
  );
};

export default memo(Home);

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const blogs: Array<Blog> = await getClient(preview).fetch(
    `*[_type == "post" && defined(views)] | order(views desc) [0...3] {..., "slug": slug.current}`
  );

  const projects: Array<Project> = await getClient(preview).fetch(
    `*[_type == "project"]`
  );

  return {
    props: {
      blogs,
      projects
    },
    revalidate: 60 * 60 * 24
  };
};
