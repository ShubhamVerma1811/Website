import { Fragment } from 'react';
import Blogs from '../components/Blogs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Hero from '../components/Hero';

const Index = ({ data, blogData }) => {
  return (
    <Fragment>
      <Header profiles={data.basics.profiles} />
      <Hero basics={data.basics} />
      <Gallery projects={data.projects} />
      <Blogs blogs={blogData} />
      <Footer />
    </Fragment>
  );
};

export async function getServerSideProps() {
  const res = await fetch('https://shubhamverma1811.github.io/APIS/api.json');
  const data = await res.json();

  const blogRes = await fetch('https://api.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          user(username:"shubhamverma18"){
            publication{
              posts(page:0){
                _id
                title
             brief
                slug
                totalReactions
                replyCount
                coverImage
              }
            }
          }
        }
      `,
    }),
  });

  const blogData = await blogRes.json();

  return {
    props: {
      data,
      blogData,
    },
  };
}

export default Index;
