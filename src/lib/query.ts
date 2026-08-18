import { sanityAdapter } from "./sanity/client";

export interface QueryOptions {
	preview?: boolean;
}

export interface QueryService {
	get<T>(
		query: string,
		variables?: Record<string, any>,
		options?: QueryOptions
	): Promise<T>;
	mutate(mutations: any[]): Promise<unknown>;
}

class Query implements QueryService {
	constructor(private readonly service: QueryService) {}

	async get<T>(
		query: string,
		variables?: Record<string, any>,
		options?: QueryOptions
	): Promise<T> {
		return this.service.get<T>(query, variables, options);
	}

	async mutate(mutations: any[]): Promise<unknown> {
		return this.service.mutate(mutations);
	}
}

export const query = new Query(sanityAdapter);
