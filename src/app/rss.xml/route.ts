import { cookies } from "next/headers";
import { generateRSSFeed } from "services/rss";
import { getClient } from "services/sanity-server";
import type { Blog } from "types";

export async function GET() {
	const cookieStore = await cookies();
	const preview = cookieStore.has("__prerender_bypass");

	const blogs: Array<Blog> = await getClient(preview).fetch(
		`*[_type == "post"] | order(date desc) {...,"slug": slug.current, "id": _id, "readTime": round(length(body) / 5 / 180 )}`
	);

	const rss = generateRSSFeed(blogs);

	return new Response(rss, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
}
