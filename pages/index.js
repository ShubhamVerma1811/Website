import Head from 'next/head';
import { Fragment } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Hero from '../components/Hero';

const Index = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Shubham Verma | Portfolio</title>
        <link rel="shortcut icon" href="../favicon.png" type="image/x-icon" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Shubham Verma - Frontend Developer Portfolio"
        />
        <link rel="apple-touch-icon" href="/custom-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="msapplication-config" content="browserconfig.xml" />
      </Head>
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
