import { RightArrow } from 'components/Icons';
import Link from 'next/link';
import { Blogs as Blog } from 'types';
import { BlogCard } from './BlogCard';

interface BlogsCompProps {
  blogs: Array<Blog>;
}

export const RecentBlogSection = ({ blogs }: BlogsCompProps) => {
  if (!blogs.length) return null;

  return (
    <section className='my-12'>
      <p className='mb-3 text-4xl font-bold text-skin-secondary'>Top Blogs</p>
      {blogs?.map((blog, index) => {
        return <BlogCard key={index} blog={blog} />;
      })}
      <Link href='/blog'>
        <a className='cursor-pointer pb-1 font-bold text-skin-secondary hover:border-b'>
          Read all posts
          <RightArrow className='ml-2 inline-block' />
        </a>
      </Link>
    </section>
  );
};
