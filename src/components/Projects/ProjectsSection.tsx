import React from 'react';
import { Project } from 'types';
import { ProjectsCard } from '.';

interface ProjectCompProps {
  projects: Array<Project>;
}

export const ProjectsSection = ({ projects }: ProjectCompProps) => {
  if (!projects.length) return null;

  return (
    <section className='my-12'>
      <p className='mb-3 text-4xl font-bold text-skin-secondary'>
        Featured Projects
      </p>
      {projects?.map((project, index) => {
        return <ProjectsCard key={index} project={project} />;
      })}
    </section>
  );
};
