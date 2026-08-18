import { type QueryOptions, query } from "lib/query";
import { urlFor } from "lib/sanity/client";
import type { Blog } from "types";
import { SanityBlogsRepo } from "./repo";
import type { BlogsRepository } from "./types";

export class BlogsService {
	constructor(private repo: BlogsRepository) {
		this.repo = repo;
	}

	async getBlogs(options?: QueryOptions) {
		const blogs = await this.repo.getBlogs(options);
		return blogs.map(this.resolveCover);
	}

	getBlogSlugs() {
		return this.repo.getBlogSlugs();
	}

	getSearchIndex() {
		return this.repo.getSearchIndex();
	}

	async getBySlug(slug: string) {
		const blog = await this.repo.getBySlug(slug);
		return blog ? this.resolveCover(blog) : blog;
	}

	incrementViews(id: string) {
		return this.repo.incrementViews(id);
	}

	private resolveCover(blog: Blog): Blog {
		return blog.cover ? { ...blog, cover: urlFor(blog.cover).url() } : blog;
	}
}

export const blogsService = new BlogsService(new SanityBlogsRepo(query));
