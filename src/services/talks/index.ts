import { query } from "lib/query";
import { SanityTalksRepo } from "./repo";
import type { TalksRepository } from "./types";

export class TalksService {
	constructor(private repo: TalksRepository) {
		this.repo = repo;
	}

	getTalks() {
		return this.repo.getTalks();
	}
}

export const talksService = new TalksService(new SanityTalksRepo(query));
