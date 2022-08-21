import { Talk as ITalks } from 'types';
import { TalkCard } from './TalksCard';

export const TalksSection = ({ talks }: { talks: Array<ITalks> }) => {
  if (!talks.length) return null;

  return (
    <section className='my-12'>
      <p className='mb-3 text-4xl font-bold text-skin-secondary'>Talks</p>
      {talks?.map((talk) => (
        <TalkCard talk={talk} key={talk.id} />
      ))}
    </section>
  );
};
