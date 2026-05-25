import { z } from "zod";

export const WorkClientSchema = z.object({
	name: z.string(),
	industry: z.string().nullable().optional(),
	deliverable: z.string().nullable().optional(),
	role: z.string().nullable().optional(),
	startDate: z.string().nullable().optional(),
	endDate: z.string().nullable().optional(),
	highlights: z.array(z.string()).nullable().optional(),
	logoUrl: z.string().nullable().optional(),
});

export const WorkPositionSchema = z.object({
	title: z.string(),
	startDate: z.string(),
	endDate: z.string().nullable().optional(),
});

export const WorkSchema = z.object({
	_id: z.string(),
	companyName: z.string(),
	location: z.string().nullable().optional(),
	logoUrl: z.string().nullable().optional(),
	startDate: z.string(),
	endDate: z.string().nullable().optional(),
	positions: z.array(WorkPositionSchema).nullable().optional(),
	clients: z.array(WorkClientSchema).nullable().optional(),
});

export type Work = z.infer<typeof WorkSchema>;
export type WorkClient = z.infer<typeof WorkClientSchema>;
export type WorkPosition = z.infer<typeof WorkPositionSchema>;
