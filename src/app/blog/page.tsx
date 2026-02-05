import { BlogCard } from "components/Blogs/BlogCard";
import { PageLayout } from "layouts";
import Script from "next/script";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { DOMAIN } from "services/constants";
import { getClient } from "services/sanity-server";
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

	const breadcrumbs: WithContext<BreadcrumbList> = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: DOMAIN,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Blog",
				item: `${DOMAIN}/blog`,
			},
		],
	};

	return (
		<PageLayout>
			<Script
				id="blog-index-breadcrumbs-ld-json"
				type="application/ld+json"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
			/>
			{blogs.map((blog, index) => {
				return <BlogCard key={blog.id} blog={blog} />;
			})}
		</PageLayout>
	);
}
