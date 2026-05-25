import { getClient, urlFor } from "services/sanity-server";
import type { Work } from "types";

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

export async function getWorks(): Promise<Work[]> {
	const raw = await getClient().fetch(
		`*[_type == "work"] | order(startDate desc) {
			...,
			clients[] {
				...,
			}
		}`
	);

	return raw.map((w: Record<string, unknown>) => {
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
}
