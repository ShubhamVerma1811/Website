import { sanityClient } from '$lib/sanity.js';

// export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const blogs = await sanityClient.fetch(
    `*[_type == "post" && defined(views)] | order(views desc) [0...3] {..., "slug": slug.current,"readTime": round(length(body) / 5 / 180 )}`
  );

  const projects = await sanityClient.fetch(`*[_type == "project"]`);

  const talks = await sanityClient.fetch(`*[_type == "talk"] {..., "id": _id}`);

  return {
    blogs,
    projects,
    talks
  };
}
