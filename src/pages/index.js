import { Fragment } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Hero from '../components/Hero';

const Index = (props) => {
  return (
    <Fragment>
      <Header profiles={props.basics.profiles} />
      <Hero basics={props.basics} />
      <Gallery projects={props.projects} />
      <Contact />
      <Footer />
    </Fragment>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    'https://gitconnected.com/v1/portfolio/shubhamverma1811',
  );
  const data = await res.json();

  return {
    props: data,
  };
}

export default Index;
