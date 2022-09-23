import { BackToTop, LinkedInIcon, TwitterIcon } from 'components';
import Head from 'next/head';
import React from 'react';
import { DOMAIN, TWITTER_HANDLE } from 'services/constants';
import { urlForImage } from 'services/sanity-image-builder';
import { Blog } from 'types';

interface IBlogLayoutProps {
  blog: Blog;
}

export const BlogLayout: React.FC<IBlogLayoutProps> = ({ blog, children }) => {
  const url = encodeURIComponent(`${DOMAIN}/blog/${blog.slug}`);

  return (
    <React.Fragment>
      <MetaTags blog={blog} />
      <main className='mb-0'>
        {children}
        <hr className='my-4 border-skin-primary-muted' />
        <ShareIntents title={blog?.title} url={url} />
        <BackToTop />
      </main>
    </React.Fragment>
  );
};

const ShareIntents = ({ title, url }: { title: string; url: string }) => {
  return (
    <div>
      <p className='text-lg font-medium text-skin-secondary lg:text-xl'>
        Found this blog helpful? Share it with your friends!
      </p>
      <div>
        <div className='flex items-center'>
          <a
            target='_blank'
            href={`
              https://twitter.com/intent/tweet?text=Checkout this blog by ${TWITTER_HANDLE} on ${title}!&url=${url}
              `}
            className=' mt-3 mr-5 w-max rounded-md border-2 border-transparent bg-skin-secondary-muted p-2 text-lg text-skin-secondary transition-all hover:border-white'
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

const MetaTags = ({ blog }: IBlogLayoutProps) => {
  const cover = blog.cover && urlForImage(blog.cover).url();

  return (
    <Head>
      <title>{blog?.title} | Shubham Verma</title>
      <meta name='description' content={blog?.summary} />

      {blog?.canonicalUrl && <link rel='canonical' href={blog?.canonicalUrl} />}
      <meta name='author' content='Shubham Verma' />

      {/* <!-- Twitter Card data --> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={TWITTER_HANDLE} />
      <meta name='twitter:title' content={blog?.title} />
      <meta name='twitter:description' content={blog?.summary} />
      <meta name='twitter:creator' content={TWITTER_HANDLE} />
      {cover && <meta name='twitter:image' content={cover} />}
      <meta name='twitter:image:alt' content={blog?.summary} />
      {/* <!-- Open Graph data --> */}
      <meta property='og:title' content={blog?.title} />
      <meta property='og:type' content='article' />
      {cover && <meta property='og:image' content={cover} />}
      <meta property='og:image:alt' content={blog?.summary} />
      <meta property='og:description' content={blog?.summary} />
    </Head>
  );
};
