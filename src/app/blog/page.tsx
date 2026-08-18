import { BlogCard } from "components/Blogs/BlogCard";
import { SchemaScript } from "components/SchemaScript";
import { PageLayout } from "layouts";
import { blogsService } from "services/blogs";
import { getBreadcrumbs } from "services/schemas";
import { generateMetaData } from "services/util";

export const revalidate = 86400;

export const metadata = generateMetaData({
	title: "Blogs | Shubham Verma",
	description:
		"I blog about open source tools, writing blogs on problems and solutions faced by developers, and other stuff.",
});

async function getData() {
	const blogs = await blogsService.getBlogs();

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
