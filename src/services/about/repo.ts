import type { QueryService } from "lib/query";
import type { AboutDoc, AboutRepository } from "./types";

export class SanityAboutRepo implements AboutRepository {
	constructor(private readonly queryService: QueryService) {}

	getAbout(): Promise<AboutDoc> {
		return this.queryService.get<AboutDoc>(`*[_type == "about"][0]`);
	}
}
