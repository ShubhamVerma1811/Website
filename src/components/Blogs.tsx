import { useLoadMore } from '../hooks/useLoadMore';
import { IBlogs } from '../types';
import LoadMoreButton from './LoadMoreButton';

interface IBlogsProps {
  blogs: IBlogs;
}

const Blogs = ({ blogs }: IBlogsProps) => {
  const _posts = blogs?.data?.user?.publication?.posts;
  const { items: posts, hasMore, loadMore } = useLoadMore(_posts);
  return (
    <section className="body-font bg-gray-900 text-gray-500">
      <div className="mx-auto px-5 py-12">
        <div className="mb-12 flex w-full flex-col text-center">
          <h1 className="title-font text-2xl font-medium text-white sm:text-3xl">
            Blogs
          </h1>
        </div>
        <div className="container mx-auto px-5">
          <div className="-m-4 flex flex-wrap">
            {posts?.map((post) => (
              <div
                key={post?._id}
                className="overflow-hidden p-4 md:w-1/2 lg:w-1/3">
                <div className="h-full overflow-hidden rounded-lg border-2 border-gray-800">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://blogs.shubhamverma.me/${post?.slug}`}>
                    <img
                      className={`w-full object-cover object-center md:h-36 lg:h-48 umami--click-${post?.slug}`}
                      src={post?.coverImage}
                      alt="blog"
                    />
                  </a>
                  <div className="p-6">
                    <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-500">
                      CATEGORY
                    </h2>
                    <h1 className="title-font mb-3 truncate text-lg font-medium text-white">
                      {post?.title}
                    </h1>
                    <p className="mb-3 leading-relaxed">
                      {post?.brief.substr(0, 120)} . . .
                    </p>
                    <div className="flex flex-wrap items-center ">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex cursor-pointer items-center text-indigo-500 md:mb-2 lg:mb-0 umami--click-${post?.slug}`}
                        href={`https://blogs.shubhamverma.me/${post?.slug}`}>
                        Read More
                        <svg
                          className="ml-2 h-4 w-4"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                      <span className="mr-3 ml-auto inline-flex items-center border-r-2 border-gray-800 py-1 pr-3 text-sm leading-none text-gray-600 md:ml-0 lg:ml-auto">
                        <svg
                          className="mr-1 h-4 w-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {post.totalReactions}
                      </span>
                      <span className="inline-flex items-center text-sm leading-none text-gray-600">
                        <svg
                          className="mr-1 h-4 w-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24">
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        {post.replyCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LoadMoreButton hasMore={hasMore} loadMore={loadMore} />
    </section>
  );
};

export default Blogs;
