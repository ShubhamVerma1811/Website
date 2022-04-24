import { Blogs, Hero } from 'components';
import { PageLayout } from 'layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { memo } from 'react';
import Notion from 'services/notion';

const Home = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Hero />
      <Blogs blogs={blogs.slice(0, 3)} />
    </PageLayout>
  );
};

export default memo(Home);

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
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
  const blogs = await notion.getPosts();

  return {
    props: {
      portfolio,
      blogs,
      pullRequests,
    },
    revalidate: 120,
  };
};
