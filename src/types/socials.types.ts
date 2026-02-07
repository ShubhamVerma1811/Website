import { z } from "zod";

const SocialScheme = z.object({
	id: z.string(),
	name: z.string(),
	url: z.string(),
	color: z.string().optional(),
	handle: z.string(),
});

export type Social = z.infer<typeof SocialScheme>;
