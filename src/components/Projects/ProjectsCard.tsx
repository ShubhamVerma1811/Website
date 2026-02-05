import { DiagonalArrow } from 'components/Icons';
import type { Project } from 'types';

interface ProjectCompProps {
  project: Project;
}

export const ProjectsCard = ({ project }: ProjectCompProps) => {
  return (
    <div className='my-4 cursor-pointer rounded-md bg-skin-secondary-muted p-3 transition-all hover:scale-[1.02]'>
      <div className='flex items-center'>
        <p className='text-skin-secondary text-xl'>{project.title}</p>
      </div>

      <p className='my-2 line-clamp-2 rounded-md text-md text-skin-primary-muted'>
        {project.summary}
      </p>
      <div className='mt-3'>
        <a
          target='_blank'
          href={project.live}
          data-umami-event={`project-${project.title
            .split(' ')
            .join('-')}-live`}
          className='text-lg text-skin-accent underline-offset-4 hover:underline'
          rel='noopener noreferrer'>
          <strong>Live Link</strong>
          <DiagonalArrow className='inline' />
        </a>

        <a
          target='_blank'
          href={project.repo}
          data-umami-event={`project-${project.title
            .split(' ')
            .join('-')}-repo`}
          className='ml-3 text-lg text-skin-accent underline-offset-4 hover:underline'
          rel='noopener noreferrer'>
          <strong>Repo Link</strong>
          <DiagonalArrow className='inline' />
        </a>
      </div>
    </div>
  );
};
