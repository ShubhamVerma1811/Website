import { DiagonalArrow } from "components";
import { WorkHistory } from "components/WorkHistory";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { HIRE_MAIL, RESUME_URL } from "services/constants";
import { getClient, urlFor } from "services/sanity-server";
import { generateMetaData } from "services/util";
import type { Work } from "types";

export const metadata: Metadata = generateMetaData({
	title: "Experience | Shubham Verma",
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

	return { works };
}

export default async function WorkPage() {
	const { works } = await getData();

	return (
		<React.Fragment>
			<p className="mb-6 font-extrabold font-secondary text-3xl text-skin-secondary">
				Work
			</p>
			<div className="-mt-3 mb-6 flex flex-wrap items-center">
				<a
					target="_blank"
					href={`mailto:${HIRE_MAIL}`}
					data-umami-event="hero-calendar"
					className="mt-3 w-max rounded-md p-2 text-lg text-md text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted md:text-lg"
					rel="noopener noreferrer"
				>
					Hire Me
					<DiagonalArrow className="inline text-xl" />
				</a>
				<Link
					href={RESUME_URL}
					target="_blank"
					rel="noopener noreferrer"
					data-umami-event="hero-resume"
					className="mt-3 mr-2 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted"
				>
					Resume
					<DiagonalArrow className="inline text-xl" />
				</Link>
			</div>

			<WorkHistory works={works} />
		</React.Fragment>
	);
}
