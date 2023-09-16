import { sanityClient } from '$lib/sanity.js';
import type { Blog } from '../../../types/blogs.types';

/** @type {import('./$types').PageLoad} */
export async function load({ params: { slug } }) {
  const blog: Blog = await sanityClient.fetch(
    `*[_type == "post" && !defined(publicationUrl) && slug.current == "${slug}"][0] {...,"id": _id, "slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
  );

  return {
    blog
  };
}
