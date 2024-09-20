import { TalkCard } from 'components/Talks';
import { PageLayout } from 'layouts';
import { getClient } from 'services/sanity-server';
import type { Talk } from 'types';

async function getData() {
  const talks: Array<Talk> = await getClient().fetch(
    `*[_type == "talk"] {..., "id": _id}`
  );

  return {
    // blogs,
    talks
    // talks
  };
}

export default async function Talk() {
  const { talks } = await getData();

  return (
    <PageLayout>
      {talks?.map((talk, index) => {
        return <TalkCard key={talk.id} talk={talk} />;
      })}
    </PageLayout>
  );
}
