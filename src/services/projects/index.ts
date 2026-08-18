import { query } from "lib/query";
import { SanityProjectsRepo } from "./repo";
import type { ProjectsRepository } from "./types";

export class ProjectsService {
	constructor(private repo: ProjectsRepository) {
		this.repo = repo;
	}

	getProjects() {
		return this.repo.getProjects();
	}
}

export const projectsService = new ProjectsService(
	new SanityProjectsRepo(query)
);
