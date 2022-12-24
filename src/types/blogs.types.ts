import { z } from 'zod';

const BlogScheme = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  slug: z.string(),
  date: z.date(),
  publicationUrl: z.string().optional(),
  canonicalUrl: z.string().optional(),
  readTime: z.number(),
  views: z.number(),
  cover: z.string().optional(),
  body: z.string()
});

export type Blog = z.infer<typeof BlogScheme>;
