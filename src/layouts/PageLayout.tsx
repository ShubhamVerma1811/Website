import { Footer, Header } from 'components';
import React from 'react';

export const PageLayout: React.FC = (props) => {
  return (
    <div className="mx-6 my-5 max-w-4xl sm:mx-12 md:mx-32 lg:mx-auto">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
