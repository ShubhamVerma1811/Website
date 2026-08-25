import type {
	BreadcrumbList,
	Graph,
	Person,
	Thing,
	WebSite,
	WithContext,
} from "schema-dts";
import {
	CITY,
	COUNTRY,
	CURRENT_ORGANIZATION,
	CURRENT_TITLE,
	DOMAIN,
	GITHUB_URL,
	HIRE_MAIL,
	INSTAGRAM_URL,
	LINKEDIN_URL,
	SPOTIFY_URL,
	TWITTER_URL,
} from "services/util";
import type { Blog, Project, Talk, Testimonial, Work } from "types";

const SCHEMA_CONTEXT = "https://schema.org" as const;

export function buildGraph(entities: Thing[]): Graph {
	return {
		"@context": SCHEMA_CONTEXT,
		"@graph": entities,
	};
}

export const personEntity = {
	"@type": "Person" as const,
	"@id": `${DOMAIN}#person`,
	name: "Shubham Verma",
	url: DOMAIN,
	email: HIRE_MAIL,
	jobTitle: CURRENT_TITLE,
	worksFor: {
		"@type": "Organization",
		name: CURRENT_ORGANIZATION,
	},
	address: {
		"@type": "PostalAddress",
		addressLocality: CITY,
		addressCountry: COUNTRY,
	},
	sameAs: [TWITTER_URL, LINKEDIN_URL, GITHUB_URL, INSTAGRAM_URL, SPOTIFY_URL],
};

export const personSchema: WithContext<Person> = {
	"@context": SCHEMA_CONTEXT,
	...personEntity,
} as WithContext<Person>;

export const websiteEntity = {
	"@type": "WebSite" as const,
	"@id": `${DOMAIN}#website`,
	url: DOMAIN,
	name: "Shubham Verma",
	publisher: {
		"@id": `${DOMAIN}#person`,
	},
	inLanguage: "en",
	description:
		"Personal website of Shubham Verma, a software engineer and tech enthusiast.",
	potentialAction: {
		"@type": "SearchAction",
		target: {
			"@type": "EntryPoint",
			urlTemplate: `${DOMAIN}/search?q={search_term_string}`,
		},
		"query-input": "required name=search_term_string",
	},
};

export const websiteSchema: WithContext<WebSite> = {
	"@context": SCHEMA_CONTEXT,
	...websiteEntity,
} as WithContext<WebSite>;

export function getBreadcrumbList(
	items: Array<{ name: string; item: string }>
) {
	return {
		"@type": "BreadcrumbList" as const,
		itemListElement: items.map(({ name, item }, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name,
			item,
		})),
	};
}

export const getBreadcrumbs = (): WithContext<BreadcrumbList> =>
	({
		"@context": SCHEMA_CONTEXT,
		...getBreadcrumbList([
			{ name: "Home", item: DOMAIN },
			{ name: "Blog", item: `${DOMAIN}/blog` },
		]),
	}) as WithContext<BreadcrumbList>;

export function getBlogPostingEntity(blog: Blog) {
	const url = `${DOMAIN}/blog/${blog.slug}`;
	return {
		"@type": "BlogPosting" as const,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		headline: blog.title,
		description: blog.summary,
		image: [blog?.cover ?? `${DOMAIN}/api/og?title=${blog?.title}`],
		author: {
			"@id": `${DOMAIN}#person`,
		},
		publisher: {
			"@id": `${DOMAIN}#person`,
		},
		datePublished: new Date(blog.date).toISOString(),
		dateModified: new Date(blog.date).toISOString(),
		url,
	};
}

export function getBlogIndexGraph(blogs: Blog[]) {
	return buildGraph([
		getBreadcrumbList([
			{ name: "Home", item: DOMAIN },
			{ name: "Blog", item: `${DOMAIN}/blog` },
		]) as unknown as Thing,
		{
			"@type": "ItemList",
			itemListElement: blogs.map((blog, i) => ({
				"@type": "ListItem",
				position: i + 1,
				url: `${DOMAIN}/blog/${blog.slug}`,
				name: blog.title,
			})),
		} as unknown as Thing,
	]);
}

export function getBlogPostGraph(blog: Blog) {
	const url = `${DOMAIN}/blog/${blog.slug}`;
	return buildGraph([
		getBlogPostingEntity(blog) as unknown as Thing,
		getBreadcrumbList([
			{ name: "Home", item: DOMAIN },
			{ name: "Blog", item: `${DOMAIN}/blog` },
			{ name: blog.title, item: url },
		]) as unknown as Thing,
	]);
}

export function getProfilePageGraph() {
	return buildGraph([
		{
			"@type": "ProfilePage",
			"@id": `${DOMAIN}#profilepage`,
			mainEntity: {
				"@id": `${DOMAIN}#person`,
			},
		} as unknown as Thing,
	]);
}

export function getProjectsGraph(projects: Project[]) {
	return buildGraph([
		{
			"@type": "ItemList",
			itemListElement: projects.map((project, i) => ({
				"@type": "ListItem",
				position: i + 1,
				item: {
					"@type": "SoftwareApplication",
					name: project.title,
					description: project.summary,
					url: project.live,
				},
			})),
		} as unknown as Thing,
	]);
}

export function getTalksGraph(talks: Talk[]) {
	return buildGraph([
		{
			"@type": "ItemList",
			itemListElement: talks.map((talk, i) => ({
				"@type": "ListItem",
				position: i + 1,
				item: {
					"@type": "Event",
					name: talk.title,
					description: talk.description,
					url: talk.url,
					startDate: talk.date,
					performer: {
						"@id": `${DOMAIN}#person`,
					},
				},
			})),
		} as unknown as Thing,
	]);
}

export function getCraftsGraph(crafts: Array<{ title: string; slug: string }>) {
	return buildGraph([
		{
			"@type": "ItemList",
			itemListElement: crafts.map((craft, i) => ({
				"@type": "ListItem",
				position: i + 1,
				item: {
					"@type": "CreativeWork",
					name: craft.title,
					url: `${DOMAIN}/craft/${craft.slug}`,
				},
			})),
		} as unknown as Thing,
	]);
}

export function getReviewsGraph(testimonials: Testimonial[]) {
	return buildGraph([
		{
			"@type": "ItemList",
			itemListElement: testimonials.map((t, i) => ({
				"@type": "ListItem",
				position: i + 1,
				item: {
					"@type": "Review",
					author: {
						"@type": "Person",
						name: t.author,
					},
					reviewBody: t.quote,
					itemReviewed: {
						"@id": `${DOMAIN}#person`,
					},
				},
			})),
		} as unknown as Thing,
	]);
}

export function getWorkGraph(works: Work[]) {
	return buildGraph([
		{
			"@type": "ItemList",
			itemListElement: works.map((work, i) => ({
				"@type": "ListItem",
				position: i + 1,
				item: {
					"@type": "Organization",
					name: work.companyName,
					employee: {
						"@id": `${DOMAIN}#person`,
					},
				},
			})),
		} as unknown as Thing,
	]);
}

export function getAboutPageGraph() {
	return buildGraph([
		{
			"@type": "AboutPage",
			"@id": `${DOMAIN}#aboutpage`,
			mainEntity: {
				"@id": `${DOMAIN}#person`,
			},
		} as unknown as Thing,
	]);
}

export const rootGraph = buildGraph([
	personEntity as unknown as Thing,
	websiteEntity as unknown as Thing,
	{
		"@type": "ProfilePage",
		"@id": `${DOMAIN}#profilepage`,
		mainEntity: {
			"@id": `${DOMAIN}#person`,
		},
	} as unknown as Thing,
]);
