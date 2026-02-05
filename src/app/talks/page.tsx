import { TalkCard } from 'components/Talks';
import { PageLayout } from 'layouts';
import { getClient } from 'services/sanity-server';
import { generateMetaData } from 'services/util';
import type { Talk } from 'types';

export const metadata = generateMetaData({
  title: 'Talks | Shubham Verma',
  description: 'Talks I have given at conferences and meetups.'
});

async function getData() {
  const talks: Array<Talk> = await getClient().fetch(
    `*[_type == "talk"] {..., "id": _id}`
  );

  return {
    talks
  };
}

export default async function TalkPage() {
  const { talks } = await getData();

  return (
    <PageLayout>
      {talks?.map((talk, index) => {
        return <TalkCard key={talk.id} talk={talk} />;
      })}
    </PageLayout>
  );
}
