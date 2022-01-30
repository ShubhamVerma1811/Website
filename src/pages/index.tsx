import Blogs from '../components/Blogs';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PullRequests from '../components/PullRequests';
import { IBlogs, IPortfolio } from '../types';
import { IPullRequests } from '../types/github.types';

interface HomeProps {
  portfolio: IPortfolio;
  blogs: IBlogs;
  pullRequests: IPullRequests;
}

const Home = ({ portfolio, blogs, pullRequests }: HomeProps) => {
  return (
    <div className="container mx-auto">
      <Header profiles={portfolio.basics.profiles} />
      <Hero basics={portfolio.basics} skills={portfolio.skills} />
      <PullRequests
        pullRequests={pullRequests}
        filteredPRIDs={portfolio.filteredPRIDs}
      />
      <Gallery projects={portfolio.projects} />
      <Blogs blogs={blogs} />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const portfolioResponse = await fetch(process.env.PORTFOLIO_API_URI!);
  const HASHNODE_GRAPHQL_ENDPOINT = process.env.HASHNODE_GRAPHQL_ENDPOINT;
  const hashnodeUsername = process.env.HASHNODE_USERNAME;
  const GITHUB_GRAPHQL_ENDPOINT = process.env.GITHUB_GRAPHQL_ENDPOINT;
  const githubUsername = process.env.GITHUB_USERNAME;
  const bearerToken = process.env.GITHUB_TOKEN;

  const blogRes = await fetch(HASHNODE_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          user(username:"${hashnodeUsername}"){
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

  const pullRequestsRes = await fetch(GITHUB_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({
      query: `
        {
      user(login: "${githubUsername}") {
        pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            title
            body
            authorAssociation
            state
            url
            id
            repository{
              name
              url
            }
          }
          totalCount
        }
      }
    }
      `,
    }),
  });

  const portfolio = await portfolioResponse.json();
  const blogs = await blogRes.json();
  const pullRequests = await pullRequestsRes.json();

  return {
    props: {
      portfolio,
      blogs,
      pullRequests,
    },
    revalidate: 3600,
  };
}

export default Home;
