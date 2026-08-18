import type { QueryService } from "lib/query";
import type { Talk } from "types";
import type { TalksRepository } from "./types";

export class SanityTalksRepo implements TalksRepository {
	constructor(private readonly queryService: QueryService) {}

	getTalks(): Promise<Talk[]> {
		return this.queryService.get<Talk[]>(`*[_type == "talk"] {..., "id": _id}`);
	}
}
