import { GetStaticPaths, GetStaticProps } from 'next';
import Notion from '../../services/notion';

const Tag = (props: { posts: any }) => {
  return (
    <div className="prose">
      {props.posts?.results.map((post: any) => (
        <p>{post.properties?.name?.title[0]?.plain_text}</p>
      ))}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const notion = new Notion();

  if (!params || !params.id) throw new Error('No id found in params');

  const posts = await notion.getPostsByTagName(params.name as string);

  return {
    props: {
      posts,
      revalidaion: 10,
    },
  };
};

export default Tag;
