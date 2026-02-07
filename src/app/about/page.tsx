import { MDXClient } from "components/MDXClient";
import { PageLayout } from "layouts";
import { getSerializedMdx } from "services/mdx";
import { getClient } from "services/sanity-server";
import { generateMetaData } from "services/util";

export const metadata = generateMetaData({
	title: "About | Shubham Verma",
});

async function getData() {
	const about = await getClient().fetch(`*[_type == "about"][0]`);

	const mdxSource = await getSerializedMdx(about.body);

	return {
		mdxSource,
	};
}

export default async function AboutPage() {
	const { mdxSource } = await getData();

	return (
		<PageLayout>
			<MDXClient mdxSource={mdxSource} />
		</PageLayout>
	);
}
