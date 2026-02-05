'use client';

import { Tabs } from 'atoms/Tabs';
import { Hero } from 'components';
import React from 'react';

export const PageLayout: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = (props) => {
  return (
    <React.Fragment>
      <Hero />
      <Tabs />
      {props.children}
    </React.Fragment>
  );
};
