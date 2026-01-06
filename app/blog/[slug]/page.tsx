import BlogViewIncrement from 'atoms/BlogViewIncrement';
import { DiagonalArrow } from 'components';
import { MDXClient } from 'components/MDXClient';
import { BlogLayout } from 'layouts';
import type { Metadata, ResolvingMetadata } from 'next';
import { serialize } from 'next-mdx-remote-client/serialize';
import Script from 'next/script';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeResizeImage from 'rehype-image-resize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { BlogPosting, BreadcrumbList, WithContext } from 'schema-dts';
import { DOMAIN } from 'services/constants';
import { transformer } from 'services/image-transformer';
import { getClient, urlFor } from 'services/sanity-server';
import type { Blog as IBlog } from 'types';

export const revalidate = 86400;

export async function generateStaticParams() {
  const blogs: Array<IBlog> = await getClient().fetch(
    `*[_type == "post"] | order(date desc) {"slug":slug.current}`
  );

  return blogs?.map(({ slug }) => slug);
}

async function getData(params: { slug: string }) {
  if (!params || !params.slug) throw new Error('No slug found in params');

  const slug = typeof params.slug === 'string' ? params.slug : params.slug[0];
  const blog: IBlog = await getClient().fetch(
    `*[_type == "post" && !defined(publicationUrl) && slug.current == "${slug}"][0] {...,"id": _id, "slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
  );

  if (!blog) {
    return {
      props: { blog: null }
    };
  }

  const mdxSource = await serialize({
    source: blog.body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: 'anchor'
              }
            }
          ],
          rehypeCodeTitles,
          [rehypeResizeImage, { transformer }]
          // rehypeImageBlur
        ]
      }
    }
  });

  return {
    props: {
      blog,
      mdxSource
    }
  };
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {
    props: { blog }
  } = await getData(params);

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

async function Blog({ params }: { params: { slug: string } }) {
  const {
    props: { blog, mdxSource }
  } = await getData(params);

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
      <Script
        id={`blog-post-${blog.slug}-ld-json`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id={`blog-post-${blog.slug}-breadcrumbs-ld-json`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <p className='mb-3 font-secondary text-4xl font-bold text-skin-secondary'>
        {blog?.title}
      </p>

      <p className='my-1 text-gray-400'>
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
      </p>
      <hr className='my-4 border-skin-primary-muted' />
      <div className='prose max-w-none text-lg text-skin-secondary prose-headings:scroll-m-20 prose-headings:font-secondary prose-headings:text-skin-secondary prose-a:text-skin-accent prose-strong:text-skin-secondary prose-em:text-skin-secondary prose-code:rounded-sm prose-code:text-skin-secondary prose-li:text-skin-secondary'>
        <MDXClient mdxSource={mdxSource} />
      </div>

      <BlogViewIncrement id={blog?.id} />
    </BlogLayout>
  );
}

export default Blog;
