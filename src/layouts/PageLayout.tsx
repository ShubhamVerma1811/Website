import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const profiles = [
  {
    id: 1,
    network: 'github',
    url: 'https://shbm.fyi/gh',
    username: 'shubhamverma1811',
  },
  {
    id: 2,
    network: 'twitter',
    url: 'https://shbm.fyi/tw',
    username: 'verma__shubham',
  },
  {
    id: 3,
    network: 'blog',
    url: '/blog',
    username: 'shubhamverma',
  },
];

const PageLayout: React.FC = (props) => {
  return (
    <React.Fragment>
      <Header profiles={profiles} />
      <div className="container mx-auto">{props.children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default PageLayout;
