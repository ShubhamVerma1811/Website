import { BlogCard } from 'components';
import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { memo, useEffect, useRef, useState } from 'react';
import { getClient } from 'services/sanity-server';
import type { Blog } from 'types';

const Blog = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <PageLayout title='Blogs'>
      <MetaLayout
        title='Blogs | Shubham Verma'
        image_url={`${process.env.DOMAIN}/api/og?title=Blogs | Shubham Verma`}
      />
      <div className='relative'>
        <input
          ref={searchInputRef}
          required
          className='w-full rounded-md bg-skin-secondary-muted p-3 text-skin-secondary'
          type='text'
          name='authors'
          id='authors'
          placeholder='Search articles'
          onChange={(e) => {
            setFilteredBlogs(
              blogs?.filter((blog) =>
                blog.title.toLowerCase().includes(e.target.value.toLowerCase())
              )
            );
          }}
        />
        <svg
          className='absolute right-3 top-[14px] h-5 w-5 text-gray-400 dark:text-gray-300'
          width='32'
          height='32'
          viewBox='0 0 24 24'>
          <path fill='currentColor' d='m7 21l7.9-18H17L9.1 21H7Z' />
        </svg>
      </div>
      {filteredBlogs.length ? (
        filteredBlogs.map((blog, index) => {
          return <BlogCard key={index} blog={blog} />;
        })
      ) : (
        <div className='my-4 text-lg text-skin-primary dark:text-skin-primary-muted'>
          No blogs found.
        </div>
      )}
    </PageLayout>
  );
};

export default memo(Blog);

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const blogs: Array<Blog> = await getClient(preview).fetch(
    `*[_type == "post"] | order(date desc) {...,"slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
  );

  return {
    props: {
      blogs
    },
    revalidate: 60 * 60 * 24
  };
};
