import { MDXClient } from "components/MDXClient";
import { WorkHistory } from "components/WorkHistory";
import { PageLayout } from "layouts";
import type { Metadata } from "next";
import { getSerializedMdx } from "services/mdx";
import { getClient } from "services/sanity-server";
import { generateMetaData } from "services/util";
import { getWorks } from "services/work";

export const metadata: Metadata = generateMetaData({
	title: "About | Shubham Verma",
});

async function getData() {
	const about = await getClient().fetch(`*[_type == "about"][0]`);
	const mdxSource = await getSerializedMdx(about.body);
	const works = await getWorks();

	return { mdxSource, works };
}

export default async function AboutPage() {
	const { mdxSource, works } = await getData();

	return (
		<PageLayout>
			<MDXClient mdxSource={mdxSource} />
			<hr className="my-4" />
			<div>
				<p className="mb-4 whitespace-nowrap font-bold font-secondary text-skin-secondary text-xl">
					Professional Experience
				</p>
				<WorkHistory works={works} />
			</div>
		</PageLayout>
	);
}
