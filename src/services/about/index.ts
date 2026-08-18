import { query } from "lib/query";
import { SanityAboutRepo } from "./repo";
import type { AboutRepository } from "./types";

export class AboutService {
	constructor(private repo: AboutRepository) {
		this.repo = repo;
	}

	getAbout() {
		return this.repo.getAbout();
	}
}

export const aboutService = new AboutService(new SanityAboutRepo(query));
