import { Project } from 'types';
import { ProjectsCard } from '.';

interface ProjectCompProps {
  projects: Array<Project>;
}

export const ProjectsSection = ({ projects }: ProjectCompProps) => {
  if (!projects.length) return null;

  return (
    <section className='my-12 scroll-m-20' id='top-projects'>
      <a href='#top-projects'>
        <p className='mb-3 font-secondary text-3xl font-bold text-skin-secondary'>
          Featured Projects
        </p>
      </a>
      {projects?.map((project, index) => {
        return <ProjectsCard key={index} project={project} />;
      })}
    </section>
  );
};
