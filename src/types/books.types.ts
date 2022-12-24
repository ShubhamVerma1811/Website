import { z } from 'zod';

const BookScheme = z.object({
  title: z.string(),
  author: z.string(),
  progress: z.union([
    z.literal('read'),
    z.literal('reading'),
    z.literal('wishlist'),
    z.literal('favorite')
  ]),
  link: z.string(),
  cover: z.string()
});

export type Book = z.infer<typeof BookScheme>;
