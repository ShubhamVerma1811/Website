import { z } from "zod";

const TalkScheme = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional(),
	date: z.string(),
	time: z.string().optional(),
	url: z.string(),
});

export type Talk = z.infer<typeof TalkScheme>;
