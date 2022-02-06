import { GetStaticProps } from 'next';
import Link from 'next/link';
import { PageLayout } from '../../layouts';
import Notion from '../../services/notion';

const notion = new Notion();

interface IBlog {
  pageInfo: any;
  database: any;
}

const Blog = (props: IBlog) => {
  // @ts-ignore
  return (
    <PageLayout>
      <div className="mx-5 mt-20 lg:mx-auto lg:mt-36 lg:grid lg:grid-cols-4">
        <div>
          <h1 className="prose mb-6 text-4xl text-white lg:mb-auto">Blogs</h1>
        </div>

        <main className="max-w-max lg:col-span-3">
          {props.database.results.map((page: any) => {
            return (
              <div className=" mb-12">
                <Link href={`/blog/${page.id}`} key={page.id}>
                  <a>
                    <h2 className="prose text-3xl  text-white">
                      {page.properties.name.title[0]?.plain_text}
                    </h2>
                    <p className="prose mb-2 text-gray-400">
                      {page.properties.subtitle?.rich_text[0]?.plain_text}
                    </p>
                    <div className="flex w-full flex-row flex-wrap">
                      {page.properties?.tags?.multi_select?.map((tag: any) => (
                        <Link href={`/blog/tag/${tag.name}`} key={tag.id}>
                          <a className="prose mr-3 mb-3  border border-gray-700 px-3 py-2 text-white no-underline">
                            {tag.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </main>
      </div>
    </PageLayout>
  );
};

export default Blog;

// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const database = await notion.getPosts(
    '914232ab-7e40-448b-bfc4-ddade4d4ccde',
  );

  return {
    props: {
      database,
    },
    revalidate: 10,
  };
};
