import Link from 'next/link';
import React from 'react';
import { Blogs as Blog } from 'types';

interface BlogsCompProps {
  blog: Blog;
}

export const BlogCard = ({ blog }: BlogsCompProps) => {
  return (
    <React.Fragment>
      <Link
        href={
          blog?.publicationUrl ? blog?.publicationUrl : `/blog/${blog?.slug}`
        }
        passHref>
        <a>
          <div className='my-4 cursor-pointer rounded-md bg-skin-secondary-muted p-3 transition-all hover:scale-[1.02]'>
            <div className='flex items-center'>
              <p className='text-xl text-skin-secondary'>{blog.title}</p>
            </div>

            <p className='my-1 text-skin-primary-muted'>
              {blog.publishedAt}
              <span className='mx-3'>•</span>
              {blog.views} views
              {blog.publicationUrl && (
                <Link href={blog.publicationUrl}>
                  <span className='text-md text-skin-secondary'>
                    <span className='mx-3'>•</span>
                    Publication
                  </span>
                </Link>
              )}
            </p>
            <p className='text-md truncate rounded-md text-skin-primary-muted'>
              {blog.description}
            </p>
          </div>
        </a>
      </Link>
    </React.Fragment>
  );
};
