import { query } from "lib/query";
import { SanitySocialsRepo } from "./repo";
import type { SocialsRepository } from "./types";

export class SocialsService {
	constructor(private repo: SocialsRepository) {
		this.repo = repo;
	}

	getSocials() {
		return this.repo.getSocials();
	}
}

export const socialsService = new SocialsService(new SanitySocialsRepo(query));
