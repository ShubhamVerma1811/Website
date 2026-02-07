import { z } from "zod";

const NowPlayingScheme = z.object({
	id: z.string(),
	album: z.string(),
	artist: z.string(),
	isPlaying: z.string(),
	songUrl: z.string(),
	title: z.string(),
	previewUrl: z.string(),
});

export type NowPlaying = z.infer<typeof NowPlayingScheme>;
