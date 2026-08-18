import type { Talk } from "types";

export interface TalksRepository {
	getTalks(): Promise<Talk[]>;
}
