import type { QueryOptions } from "lib/query";
import type { Blog } from "types";

export interface BlogsRepository {
	getBlogs(options?: QueryOptions): Promise<Blog[]>;
	getBlogSlugs(): Promise<Array<{ slug: string }>>;
	getSearchIndex(): Promise<Array<{ title: string; slug: string }>>;
	getBySlug(slug: string): Promise<Blog | null>;
	incrementViews(id: string): Promise<unknown>;
}
