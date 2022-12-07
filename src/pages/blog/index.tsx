import { BlogCard } from 'components';
import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { memo } from 'react';
import { getClient } from 'services/sanity-server';
import type { Blog } from 'types';

const Blog = ({ blogs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout title='Blogs'>
      <MetaLayout
        title='Blogs | Shubham Verma'
        image_url={`${process.env.DOMAIN}/api/og?title=Blogs | Shubham Verma`}
      />
      {blogs?.map((blog, index) => {
        return <BlogCard key={index} blog={blog} />;
      })}
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
