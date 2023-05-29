import { RecentBlogSection } from 'components/Blogs/RecentBlogSection';
import { ProjectsSection } from 'components/Projects/ProjectsSection';

import { Hero } from 'components/Hero';
import { TalksSection } from 'components/Talks';
import { Metadata } from 'next';
import { getClient } from 'services/sanity-server';
import { Blog, Project, Talk } from 'types';

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
  const blogs: Array<Blog> = await getClient().fetch(
    `*[_type == "post" && defined(views)] | order(views desc) [0...3] {..., "slug": slug.current,"readTime": round(length(body) / 5 / 180 )}`
  );

  const projects: Array<Project> = await getClient().fetch(
    `*[_type == "project"]`
  );

  const talks: Array<Talk> = await getClient().fetch(
    `*[_type == "talk"] {..., "id": _id}`
  );

  return {
    blogs,
    projects,
    talks
  };
}

export default async function Home() {
  const { blogs, projects, talks } = await getData();

  return (
    <>
      <Hero />
      <RecentBlogSection blogs={blogs} />
      <ProjectsSection projects={projects} />
      <TalksSection talks={talks} />
    </>
  );
}
