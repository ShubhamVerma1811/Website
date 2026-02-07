import { BlogCard } from "components/Blogs/BlogCard";
import { SchemaScript } from "components/SchemaScript";
import { PageLayout } from "layouts";
import { getClient } from "services/sanity-server";
import { getBreadcrumbs } from "services/schemas";
import { generateMetaData } from "services/util";
import type { Blog } from "types";

export const revalidate = 86400;

export const metadata = generateMetaData({
	title: "Blogs | Shubham Verma",
	description:
		"I blog about open source tools, writing blogs on problems and solutions faced by developers, and other stuff.",
});

async function getData() {
	const blogs: Array<Blog> = await getClient().fetch(
		`*[_type == "post"] | order(date desc) {...,"slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`
	);

	return {
		blogs,
	};
}

export default async function BlogPage() {
	const { blogs } = await getData();

	return (
		<PageLayout>
			{blogs.map((blog) => {
				return <BlogCard key={blog.id} blog={blog} />;
			})}
			<SchemaScript
				scripts={[
					{ id: "blog-index-breadcrumbs-ld-json", json: getBreadcrumbs() },
				]}
			/>
		</PageLayout>
	);
}
