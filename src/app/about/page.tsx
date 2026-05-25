import { MDXClient } from "components/MDXClient";
import { WorkHistory } from "components/WorkHistory";
import { PageLayout } from "layouts";
import type { Metadata } from "next";
import { getSerializedMdx } from "services/mdx";
import { getClient, urlFor } from "services/sanity-server";
import { generateMetaData } from "services/util";
import type { Work } from "types";

export const metadata: Metadata = generateMetaData({
	title: "About | Shubham Verma",
});

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

function formatDate(iso: string | null | undefined): string {
	if (!iso) return "Present";
	const d = new Date(iso);
	return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function parseSortValue(date: string): number {
	if (date === "Present") return Infinity;
	const [month, year] = date.split(" ");
	return parseInt(year, 10) * 12 + MONTHS.indexOf(month);
}

async function getData() {
	const about = await getClient().fetch(`*[_type == "about"][0]`);
	const mdxSource = await getSerializedMdx(about.body);

	const raw = await getClient().fetch(
		`*[_type == "work"] | order(startDate desc) {
			...,
			clients[] {
				...,
			}
		}`
	);

	const works: Work[] = raw.map((w: Record<string, unknown>) => {
		const clients: Work["clients"] = (
			(w.clients as Array<Record<string, unknown>>) ?? []
		)
			.map((c: Record<string, unknown>) => ({
				name: c.name as string,
				industry: (c.industry as string) ?? null,
				deliverable: (c.deliverable as string) ?? null,
				role: (c.role as string) ?? null,
				startDate: formatDate((c.startDate as string) ?? null),
				endDate: formatDate((c.endDate as string) ?? null),
				highlights: (c.highlights as string[]) ?? null,
				logoUrl: c.logo ? urlFor(c.logo).url() : null,
			}))
			.sort(
				(a, b) => parseSortValue(b.startDate) - parseSortValue(a.startDate)
			);

		return {
			_id: w._id as string,
			companyName: w.companyName as string,
			location: (w.location as string) ?? null,
			logoUrl: w.logo ? urlFor(w.logo).url() : null,
			startDate: w.startDate as string,
			endDate: (w.endDate as string) ?? null,
			positions: null,
			clients,
		} satisfies Work;
	});

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
