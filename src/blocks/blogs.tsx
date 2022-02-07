import Link from 'next/link';
import React from 'react';

const BlogsBlock = (page: any) => {
  return (
    <div className="mb-12">
      <Link
        href={`/blog/${page.properties.slug?.rich_text?.[0].plain_text}`}
        key={page.id}>
        <a>
          <h2 className="prose text-3xl  text-white">
            {page.properties.name.title[0]?.plain_text}
          </h2>
          <p className="prose mb-2 text-gray-400">
            {page.properties.subtitle?.rich_text[0]?.plain_text}
          </p>
          <div className="flex w-full flex-row flex-wrap">
            {page.properties?.tags?.multi_select?.map((tag: any) => (
              <Link href={`/blog/tag/${tag.name}`} key={tag.id}>
                <a className="prose mr-3 mb-3  border border-gray-700 px-3 py-2 text-white no-underline">
                  {tag.name}
                </a>
              </Link>
            ))}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BlogsBlock;
