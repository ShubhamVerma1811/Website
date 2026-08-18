import type { QueryOptions, QueryService } from "lib/query";
import type { Blog } from "types";
import type { BlogsRepository } from "./types";

export class SanityBlogsRepo implements BlogsRepository {
	constructor(private readonly queryService: QueryService) {}

	getBlogs(options?: QueryOptions): Promise<Blog[]> {
		return this.queryService.get<Blog[]>(
			`*[_type == "post"] | order(date desc) {..., "id": _id, "slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`,
			undefined,
			options
		);
	}

	getBlogSlugs(): Promise<Array<{ slug: string }>> {
		return this.queryService.get(
			`*[_type == "post"] | order(date desc) {"slug": slug.current}`
		);
	}

	getSearchIndex(): Promise<Array<{ title: string; slug: string }>> {
		return this.queryService.get(
			`*[_type == "post" && !defined(publicationUrl)]{title, "slug": slug.current}`
		);
	}

	getBySlug(slug: string): Promise<Blog | null> {
		return this.queryService.get<Blog | null>(
			`*[_type == "post" && !defined(publicationUrl) && slug.current == $slug][0] {..., "id": _id, "slug": slug.current, "readTime": round(length(body) / 5 / 180 )}`,
			{ slug }
		);
	}

	incrementViews(id: string): Promise<unknown> {
		return this.queryService.mutate([{ patch: { id, inc: { views: 1 } } }]);
	}
}
