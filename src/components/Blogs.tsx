import Link from 'next/link';
import BlogsBlock from '../blocks/blogs';

interface IBlogsProps {
  blogs: any;
}

const Blogs = ({ blogs }: IBlogsProps) => {
  // const _posts = blogs?.data?.user?.publication?.posts;
  // const { items: posts, hasMore, loadMore } = useLoadMore(_posts);
  return (
    <section className="body-font bg-gray-900 text-gray-500">
      <div className="mx-auto px-5 py-12">
        <div className="mb-12 flex w-full flex-col text-center">
          <h1 className="title-font text-2xl font-medium text-white sm:text-3xl">
            Blogs
          </h1>
        </div>
        <div className="container mx-auto px-5">
          <div className="-m-4">
            {blogs.slice(0, 3).map((blog: any, index: number) => (
              <BlogsBlock {...blog} key={index} />
            ))}
          </div>
        </div>
        <Link href="/blog">
          <a className="text-xl text-indigo-400 underline">View All Blogs</a>
        </Link>
      </div>

      {/* <LoadMoreButton hasMore={hasMore} loadMore={loadMore} /> */}
    </section>
  );
};

export default Blogs;
