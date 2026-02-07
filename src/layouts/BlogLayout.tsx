import { LinkedInIcon, TwitterIcon } from 'components';
import React from 'react';
import { DOMAIN, TWITTER_HANDLE } from 'services/constants';
import type { Blog } from 'types';

interface IBlogLayoutProps {
  blog: Blog;
  children: React.ReactNode;
}

export const BlogLayout: React.FC<IBlogLayoutProps> = ({ blog, children }) => {
  const url = encodeURIComponent(`${DOMAIN}/blog/${blog.slug}`);

  return (
    <React.Fragment>
      {children}
      <hr className='my-4 border-skin-primary-muted' />
      <ShareIntents title={blog?.title} url={url} />
    </React.Fragment>
  );
};

const ShareIntents = ({ title, url }: { title: string; url: string }) => {
  return (
    <div>
      <p className='font-medium text-lg text-skin-secondary lg:text-xl'>
        Found this blog helpful? Share it with your friends!
      </p>
      <div>
        <div className='flex items-center'>
          <a
            target='_blank'
            href={`
              https://twitter.com/intent/tweet?text=Checkout this blog by ${TWITTER_HANDLE} on ${title}!&url=${url}
              `}
            className='mt-3 mr-5 w-max rounded-md border-2 border-transparent bg-skin-secondary-muted p-2 text-lg text-skin-secondary transition-all hover:border-white'
            rel='noopener noreferrer'>
            <strong className='flex items-center'>
              <TwitterIcon className='mr-2 text-[#1DA1F2]' />
              Twitter
            </strong>
          </a>
          <a
            target='_blank'
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            className='mt-3 w-max rounded-md border-2 border-transparent bg-skin-secondary-muted p-2 text-lg text-skin-secondary transition-all hover:border-white'
            rel='noopener noreferrer'>
            <strong className='flex items-center'>
              <LinkedInIcon className='mr-2 text-[#0a66c2] dark:text-[#fff]' />
              LinkedIn
            </strong>
          </a>
        </div>
      </div>
    </div>
  );
};
