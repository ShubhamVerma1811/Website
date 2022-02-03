import { GetStaticProps } from 'next';
import Link from 'next/link';
import Notion from '../../services/notion';

const notion = new Notion();

interface IBlog {
  pageInfo: any;
}

const Blog = (props: IBlog) => {
  return props.database.results.map((page) => (
    <Link href={`/blog/${page.id}`}>
      <a>
        <h1 className="text-white">
          {page.properties.name.title[0].plain_text}
        </h1>
      </a>
    </Link>
  ));
};

export default Blog;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const database = await notion.getPosts(
    '914232ab-7e40-448b-bfc4-ddade4d4ccde',
  );

  return {
    props: {
      database,
    },
    revalidate: 120, // 2 mins
  };
};
