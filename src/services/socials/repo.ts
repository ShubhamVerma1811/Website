import type { QueryService } from "lib/query";
import type { Social } from "types";
import type { SocialsRepository } from "./types";

export class SanitySocialsRepo implements SocialsRepository {
	constructor(private readonly queryService: QueryService) {}

	getSocials(): Promise<Social[]> {
		return this.queryService.get<Social[]>(
			`*[_type == "social"] | order(_createdAt asc) {..., "id": _id}`
		);
	}
}
