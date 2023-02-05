import { Talk as ITalks } from 'types';
import { TalkCard } from '.';

export const TalksSection = ({ talks }: { talks: Array<ITalks> }) => {
  if (!talks.length) return null;

  return (
    <section className='my-12 scroll-m-20' id='talks'>
      <a href='#talks'>
        <p className='mb-3 font-secondary text-3xl font-bold text-skin-secondary'>
          Talks
        </p>
      </a>
      {talks?.map((talk) => (
        <TalkCard talk={talk} key={talk.id} />
      ))}
    </section>
  );
};
