import { TalkCard } from 'components/Talks';
import { PageLayout } from 'layouts';
import React from 'react';
import { getClient } from 'services/sanity-server';
import { Talk } from 'types';

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
        return <TalkCard key={index} talk={talk} />;
      })}
    </PageLayout>
  );
}
