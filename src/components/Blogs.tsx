import Link from 'next/link';
import { Blogs as Blog } from 'types';
import { RightArrow } from './Icons';

interface BlogsCompProps {
  blogs: Array<Blog>;
}

export const Blogs = ({ blogs }: BlogsCompProps) => {
  return (
    <section className="my-24">
      <p className="text-4xl font-bold text-skin-secondary">Recent Blogs</p>
      {blogs?.map((blog, index) => {
        return (
          <Link
            href={
              blog?.publicationUrl
                ? blog?.publicationUrl
                : `/blog/${blog?.slug}`
            }
            passHref>
            <a>
              <div
                key={index}
                className="my-4 cursor-pointer rounded-md bg-skin-secondary-muted p-3 transition-all hover:scale-[1.02]">
                <div className="flex items-center">
                  <p className="text-xl text-skin-secondary">{blog.title}</p>
                </div>

                <p className="my-1 text-skin-primary-muted">
                  2 months ago
                  {/* <span className="mx-3">•</span>
                  {blog.readTime} min(s) read */}
                  {blog.publicationUrl && (
                    <Link href={blog.publicationUrl}>
                      <span className="text-md text-skin-secondary">
                        <span className="mx-3">•</span>
                        Publication
                      </span>
                    </Link>
                  )}
                </p>
                <p className="text-md truncate rounded-md text-skin-primary-muted">
                  {blog.description}
                </p>
              </div>
            </a>
          </Link>
        );
      })}
      <Link href="/blog">
        <a className="cursor-pointer pb-1 font-bold text-skin-secondary hover:border-b">
          Read all posts
          <RightArrow className="ml-2 inline-block" />
        </a>
      </Link>
    </section>
  );
};
