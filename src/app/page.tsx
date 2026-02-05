import { ProjectsCard } from 'components';
import { PageLayout } from 'layouts';

import { getClient } from 'services/sanity-server';
import { generateMetaData } from 'services/util';
import type { Project } from 'types';

export const revalidate = 86400;

export const metadata = generateMetaData({
  title: 'Shubham Verma | Software Engineer',
  description:
    'Software Engineer, Likes to build open source tools and write articles.'
});

async function getData() {
  const projects: Array<Project> = await getClient().fetch(
    `*[_type == "project"] | order(rank)`
  );

  return {
    projects
  };
}

export default async function Home() {
  const { projects } = await getData();

  return (
    <PageLayout>
      {projects?.map((project) => {
        return <ProjectsCard key={project.title} project={project} />;
      })}
    </PageLayout>
  );
}
