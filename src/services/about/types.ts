export interface AboutDoc {
	body: string;
}

export interface AboutRepository {
	getAbout(): Promise<AboutDoc>;
}
