import type { MetadataRoute } from "next";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { DOMAIN } from "services/constants";
import { getClient } from "services/sanity-server";
import type { Blog } from "types";
import { unified } from "unified";
import { visit } from "unist-util-visit";

function extractImages(markdown: string): string[] {
	const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);

	const urls = new Set<string>();

	visit(tree, (node: any) => {
		if (node.type === "image" && typeof node.url === "string")
			urls.add(node.url);
		if (node.type === "html" && typeof node.value === "string") {
			// very small heuristic; consider a proper HTML parser if you rely on HTML a lot
			const matches = node.value.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
			for (const m of matches) urls.add(m[1]);
		}
	});

	return Array.from(urls);
}

const pages = [
	"",
	"about",
	"blog",
	"craft",
	"socials",
	"spotify",
	"talks",
	"wall",
	"work",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = DOMAIN;

	const blogs: Array<Blog> = await getClient().fetch(
		`*[_type == "post"] | order(date desc) {...,"slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
	);

	const staticPages = pages.map((page) => ({
		url: `${baseUrl}/${page}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 1,
	})) satisfies MetadataRoute.Sitemap;

	const blogPages = blogs.map((blog) => {
		const extractedImages = extractImages(blog.body);
		const images = extractedImages.map((u) =>
			u.startsWith("http") ? u : new URL(u, baseUrl).toString()
		);

		return {
			url: `${baseUrl}/blog/${blog.slug}`,
			lastModified: new Date(blog.date),
			priority: 0.8,
			images: images.length > 0 ? images : undefined,
		};
	}) satisfies MetadataRoute.Sitemap;

	return [...staticPages, ...blogPages];
}
