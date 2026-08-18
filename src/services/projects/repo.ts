import type { QueryService } from "lib/query";
import type { Project } from "types";
import type { ProjectsRepository } from "./types";

export class SanityProjectsRepo implements ProjectsRepository {
	constructor(private readonly queryService: QueryService) {}

	getProjects(): Promise<Project[]> {
		return this.queryService.get<Project[]>(
			`*[_type == "project"] | order(rank)`
		);
	}
}
