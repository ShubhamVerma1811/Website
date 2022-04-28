import { BackToTop } from 'components';
import React from 'react';

export const BlogLayout: React.FC = (props) => {
  return (
    <main className='mb-12'>
      {props.children}
      <BackToTop />
    </main>
  );
};
