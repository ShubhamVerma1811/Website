import { Feed, type Item } from "feed";
import { remark } from "remark";
import remarkHTML from "remark-html";
import type { Blog } from "types";
import { HIRE_MAIL, TWITTER_URL } from "./constants";

export const generateRSSFeed = (blogs: Array<Blog>) => {
	const baseURL = process.env.DOMAIN!;

	const author = {
		name: "Shubham Verma",
		link: TWITTER_URL,
		email: HIRE_MAIL,
	};

	const feed = new Feed({
		title: "Blogs by Shubham Verma",
		description:
			"I blog about open source tools, writing blogs on problems and solutions faced by developers, and other stuff.",
		id: baseURL,
		link: baseURL,
		language: "en",
		author,
		copyright: `Copyright © ${new Date().getFullYear()} Shubham Verma`,
		feedLinks: {
			rss2: `${baseURL}/rss.xml`,
		},
	});

	blogs?.forEach((blog) => {
		const html = remark()
			.use(remarkHTML)
			.processSync(blog.body ?? "")
			.toString();

		const item: Item = {
			title: blog.title,
			id: blog.id,
			date: new Date(blog.date),
			link: `${baseURL}/blog/${blog.slug}`,
			author: [{ ...author }],
			description: blog.summary,
			// image: cover,
			content: html,
			published: new Date(blog.date),
		};

		feed.addItem(item);
	});

	return feed.rss2();
};
