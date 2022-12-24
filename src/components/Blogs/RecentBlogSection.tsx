import { RightArrow } from 'components/Icons';
import Link from 'next/link';
import type { Blog } from 'types';
import { BlogCard } from './BlogCard';

interface BlogsCompProps {
  blogs: Array<Blog>;
}

export const RecentBlogSection = ({ blogs }: BlogsCompProps) => {
  if (!blogs.length) return null;

  return (
    <section className='my-12 scroll-m-20' id='top-blogs'>
      <a href='#top-blogs'>
        <p className='mb-3 text-3xl font-bold text-skin-secondary'>Top Blogs</p>
      </a>
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
