import { BlogCard } from 'components/Blogs/BlogCard';
import { getClient } from 'services/sanity-server';
import type { Blog } from 'types';

export const revalidate = 86400;

export const metadata = {
  title: 'Blogs | Shubham Verma',
  openGraph: {
    title: 'Blogs | Shubham Verma',
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Blogs | Shubham Verma.`
      }
    ]
  }
};

async function getData() {
  const blogs: Array<Blog> = await getClient().fetch(
    `*[_type == "post"] | order(date desc) {...,"slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
  );

  return {
    blogs
  };
}

export default async function Blog() {
  const { blogs } = await getData();

  return (
    <>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Blogs
      </p>
      {blogs.length ? (
        blogs.map((blog, index) => {
          return <BlogCard key={index} blog={blog} />;
        })
      ) : (
        <div className='my-4 text-lg text-skin-primary dark:text-skin-primary-muted'>
          No blogs found.
        </div>
      )}
    </>
  );
}
