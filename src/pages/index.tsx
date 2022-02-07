import Blogs from '../components/Blogs';
import Gallery from '../components/Gallery';
import Hero from '../components/Hero';
import PullRequests from '../components/PullRequests';
import { PageLayout } from '../layouts';
import Notion from '../services/notion';
import { IBlogs, IPortfolio } from '../types';
import { IPullRequests } from '../types/github.types';

interface HomeProps {
  portfolio: IPortfolio;
  blogs: IBlogs;
  pullRequests: IPullRequests;
}

const Home = ({ portfolio, blogs, pullRequests }: HomeProps) => {
  return (
    <PageLayout>
      <Hero basics={portfolio.basics} skills={portfolio.skills} />
      <PullRequests
        pullRequests={pullRequests}
        filteredPRIDs={portfolio.filteredPRIDs}
      />
      <Gallery projects={portfolio.projects} />
      <Blogs blogs={blogs} />
    </PageLayout>
  );
};

export async function getStaticProps() {
  const portfolioResponse = await fetch(process.env.PORTFOLIO_API_URI!);
  const GITHUB_GRAPHQL_ENDPOINT = process.env.GITHUB_GRAPHQL_ENDPOINT;
  const githubUsername = process.env.GITHUB_USERNAME;
  const bearerToken = process.env.GITHUB_TOKEN;

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
  const pullRequests = await pullRequestsRes.json();

  const notion = new Notion();
  const blogs = (await notion.getPosts()).results;

  return {
    props: {
      portfolio,
      blogs,
      pullRequests,
    },
    revalidate: 120,
  };
}

export default Home;
