import type { Project } from "types";

export interface ProjectsRepository {
	getProjects(): Promise<Project[]>;
}
