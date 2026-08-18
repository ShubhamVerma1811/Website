export interface WorksRepository {
	getWorks(): Promise<Record<string, unknown>[]>;
}
