import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { QueryOptions, QueryService } from "lib/query";
import {
	type ClientConfig,
	createClient,
	type SanityClient,
} from "next-sanity";
import { sanityConfig } from "./config";

class SanityAdapter implements QueryService {
	private builder: ReturnType<typeof imageUrlBuilder>;
	private sanityClient: SanityClient;
	private previewClient: SanityClient;

	constructor(config: ClientConfig) {
		this.sanityClient = createClient(config);
		this.previewClient = createClient({ ...config, useCdn: false });
		this.builder = imageUrlBuilder(this.sanityClient);
	}

	get<T>(
		query: string,
		variables?: Record<string, any>,
		options?: QueryOptions
	): Promise<T> {
		return this.getClient(options?.preview).fetch<T>(query, variables ?? {});
	}

	mutate(mutations: any[]): Promise<unknown> {
		return this.getClient(false).mutate(mutations);
	}

	urlFor(source: SanityImageSource) {
		return this.builder.image(source);
	}

	private getClient(preview?: boolean) {
		return preview ? this.previewClient : this.sanityClient;
	}
}

export const sanityAdapter = new SanityAdapter(sanityConfig);

export const urlFor = (source: SanityImageSource) =>
	sanityAdapter.urlFor(source);
