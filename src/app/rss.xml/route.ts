import { cookies } from "next/headers";
import { blogsService } from "services/blogs";
import { generateRSSFeed } from "services/rss";

export async function GET() {
	const cookieStore = await cookies();
	const preview = cookieStore.has("__prerender_bypass");

	const blogs = await blogsService.getBlogs({ preview });

	const rss = generateRSSFeed(blogs);

	return new Response(rss, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
}
