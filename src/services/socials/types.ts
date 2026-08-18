import type { Social } from "types";

export interface SocialsRepository {
	getSocials(): Promise<Social[]>;
}
