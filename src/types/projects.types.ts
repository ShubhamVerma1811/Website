import { z } from 'zod';

const ProjectScheme = z.object({
  title: z.string(),
  summary: z.string(),
  live: z.string(),
  repo: z.string()
});

export type Project = z.infer<typeof ProjectScheme>;
