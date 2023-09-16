import { sanityClient } from '$lib/sanity.js';
import type { Blog } from '../../types/blogs.types';

// export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const blogs: Blog = await sanityClient.fetch(
    `*[_type == "post"] | order(date desc) {...,"slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
  );

  return {
    blogs
  };
}
