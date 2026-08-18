import type { QueryService } from "lib/query";
import type { WorksRepository } from "./types";

export class SanityWorksRepo implements WorksRepository {
	constructor(private readonly queryService: QueryService) {}

	getWorks(): Promise<Record<string, unknown>[]> {
		return this.queryService.get(
			`*[_type == "work"] | order(startDate desc) {
				...,
				clients[] {
					...,
				}
			}`
		);
	}
}
