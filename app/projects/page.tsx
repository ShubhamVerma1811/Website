import { ProjectsCard } from 'components';
import { PageLayout } from 'layouts';

import { Metadata } from 'next';
import { getClient } from 'services/sanity-server';
import { Project } from 'types';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Shubham Verma | Frontend Developer',
  description:
    'Frontend Developer, Likes to build open source tools and write articles. ',
  openGraph: {
    title: 'Shubham Verma | Frontend Developer',
    description:
      'Frontend Developer, Likes to build open source tools and write articles. ',
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Shubham Verma&desc=Builder, Writer, Learner.`
      }
    ]
  }
};

async function getData() {
  const projects: Array<Project> = await getClient().fetch(
    `*[_type == "project"]`
  );

  return {
    projects
  };
}

export default async function Project() {
  const { projects } = await getData();

  return (
    <PageLayout>
      {projects?.map((project, index) => {
        return <ProjectsCard key={index} project={project} />;
      })}
    </PageLayout>
  );
}
