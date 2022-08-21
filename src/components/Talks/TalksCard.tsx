import Link from 'next/link';
import React from 'react';
import { Talk as ITalk } from 'types';

export const TalkCard = ({ talk }: { talk: ITalk }) => {
  return (
    <React.Fragment>
      <Link href={talk.url} passHref>
        <a>
          <div className='my-4 cursor-pointer rounded-md bg-skin-secondary-muted p-3 transition-all hover:scale-[1.02]'>
            <div className='flex items-center justify-between'>
              <p className='text-xl text-skin-secondary'>{talk.title}</p>
              {talk.time && (
                <p className='ml-2 text-xl text-skin-secondary'>{talk.time}</p>
              )}
            </div>
            {talk.description && (
              <p className='my-1 text-skin-primary-muted'>{talk.description}</p>
            )}
          </div>
        </a>
      </Link>
    </React.Fragment>
  );
};
