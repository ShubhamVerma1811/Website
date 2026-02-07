import { DiagonalArrow } from 'components';
import BlogViewIncrement from 'components/BlogViewIncrement';
// import { CopyBlog } from "components/CopyBlog";
import { MDXClient } from 'components/MDXClient';
import { SchemaScript } from 'components/SchemaScript';
import Fuse from 'fuse.js';
import { BlogLayout } from 'layouts';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import type { BlogPosting, BreadcrumbList, WithContext } from 'schema-dts';
import { DOMAIN } from 'services/constants';
import { getSerializedMdx } from 'services/mdx';
import { getClient, urlFor } from 'services/sanity-server';
import type { Blog as IBlog } from 'types';
import blogs from '../../../fuse/data.json';

export const revalidate = 86400;

export async function generateStaticParams() {
  const blogs: Array<IBlog> = await getClient().fetch(
    `*[_type == "post"] | order(date desc) {"slug":slug.current}`
  );

  return blogs?.map(({ slug }) => ({ slug }));
}

async function getData(params: { slug: string }) {
  if (!params || !params.slug) throw new Error('No slug found in params');

  const fuse = new Fuse(blogs as Array<{ slug: string; title: string }>, {
    keys: ['slug', 'title'],
    useExtendedSearch: true,
    ignoreLocation: true,
    threshold: 0.44,
    minMatchCharLength: 6
  });

  const slugLength = params.slug?.split('-').length || 0;
  const relatedBlogs =
    slugLength >= 2
      ? fuse.search(params.slug).map(({ item }) => item)
      : [{ slug: '', title: '' }];

  const slug = relatedBlogs?.[0]?.slug;

  if (!slug) {
    return notFound();
  }

  const blog: IBlog = await getClient().fetch(
    `*[_type == "post" && !defined(publicationUrl) && slug.current == $slug][0] {...,"id": _id, "slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`,
    { slug }
  );

  if (!blog) {
    return notFound();
  }

  const mdxSource = await getSerializedMdx(blog.body);
  return {
    props: {
      blog,
      mdxSource
    }
  };
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const {
    props: { blog }
  } = await getData({ slug });

  if (!blog) return {};

  const d = new Date(blog.date);
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  const url = `${DOMAIN}/blog/${blog.slug}`;
  const imageUrl = blog?.cover
    ? urlFor(blog?.cover).url()
    : `${DOMAIN}/api/og?title=${blog?.title}&date=${date}&readTime=${blog?.readTime}&author=Shubham Verma&desc=${blog?.summary}`;

  return {
    metadataBase: new URL(DOMAIN),
    title: blog?.title,
    description: blog?.summary,
    alternates: {
      canonical: `/blog/${blog.slug}`
    },
    openGraph: {
      title: blog?.title,
      description: blog?.summary,
      type: 'article',
      url,
      images: {
        url: imageUrl
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: blog?.title,
      description: blog?.summary,
      images: [imageUrl]
    }
  };
}

async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const {
    props: { blog, mdxSource }
  } = await getData({ slug });

  if (!blog) return null;

  const d = new Date(blog.date);
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  const url = `${DOMAIN}/blog/${blog.slug}`;
  const imageUrl = blog?.cover
    ? urlFor(blog?.cover).url()
    : `${DOMAIN}/api/og?title=${blog?.title}&date=${date}&readTime=${blog?.readTime}&author=Shubham Verma&desc=${blog?.summary}`;

  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  });

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: blog.title,
    description: blog.summary,
    image: [imageUrl],
    author: {
      '@id': `${DOMAIN}#person`
    },
    publisher: {
      '@id': `${DOMAIN}#person`
    },
    datePublished: new Date(blog.date).toISOString(),
    dateModified: new Date(blog.date).toISOString(),
    url
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: DOMAIN
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${DOMAIN}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: url
      }
    ]
  };

  return (
    <BlogLayout blog={blog}>
      <p className='mb-3 font-bold font-secondary text-4xl text-skin-secondary'>
        {blog?.title}
      </p>

      <p className='my-1 flex flex-row text-gray-400'>
        {date} <span className='mx-3'>•</span>
        {formatter.format(blog.views)} views <span className='mx-3'>•</span>
        {blog?.readTime} min read
        {blog?.canonicalUrl && (
          <React.Fragment>
            <span className='mx-3'>•</span> Originally published on{' '}
            <a className='text-skin-accent' href={blog?.canonicalUrl}>
              {new URL(blog.canonicalUrl).hostname}
              <DiagonalArrow className='inline' />
            </a>
          </React.Fragment>
        )}
        {/*<CopyBlog blog={blog} />*/}
      </p>
      <hr className='my-4 border-skin-primary-muted' />

      <BlogViewIncrement id={blog?.id} />
      <MDXClient mdxSource={mdxSource} />

      <SchemaScript
        scripts={[
          { id: `blog-post-${blog.slug}-ld-json`, json: jsonLd },
          {
            id: `blog-post-${blog.slug}-breadcrumbs-ld-json`,
            json: breadcrumbJsonLd
          }
        ]}
      />
    </BlogLayout>
  );
}

export default Blog;
