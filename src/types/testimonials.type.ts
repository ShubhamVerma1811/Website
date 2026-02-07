import { z } from "zod";

const TestimonialScheme = z.object({
	id: z.number(),
	author: z.string(),
	role: z.string(),
	company: z.string(),
	quote: z.string(),
	avatar: z.string().url(),
});

export type Testimonial = z.infer<typeof TestimonialScheme>;
