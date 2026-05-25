import type { Metadata } from "next";
import { DOMAIN, TWITTER_HANDLE } from "services/constants";

const MONTHS = [
	"jan",
	"feb",
	"mar",
	"apr",
	"may",
	"jun",
	"jul",
	"aug",
	"sep",
	"oct",
	"nov",
	"dec",
];

export function parseSortDate(dateStr: string): number {
	if (dateStr.toLowerCase() === "present") return Infinity;
	const [month, year] = dateStr.split(" ");
	const monthIndex = MONTHS.indexOf(month.toLowerCase().slice(0, 3));
	return parseInt(year, 10) * 12 + monthIndex;
}

export function sortExperiencesByDate<T extends { date: string }>(
	arr: T[]
): T[] {
	return [...arr].sort(
		(a, b) =>
			parseSortDate(b.date.split(" - ")[0]) -
			parseSortDate(a.date.split(" - ")[0])
	);
}

export function generateMetaData({
	title,
	description,
}: {
	title: string;
	description?: string;
}): Metadata {
	return {
		metadataBase: new URL(DOMAIN),
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			type: "website",
			images: [
				{
					url: `${DOMAIN}/api/og?title=${title}&desc=${description}`,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			creator: TWITTER_HANDLE,
			title: title,
			description: description,
			images: [`${DOMAIN}/api/og?title=${title}&desc=${description}`],
		},
	};
}
