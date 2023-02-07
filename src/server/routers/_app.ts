import { getClient } from 'services/sanity-server';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`
      };
    }),
  blogs: procedure.query(async () => {
    const blogs = await getClient(false).fetch(
      `*[_type == "post" && defined(views)] | order(views desc) [0...3] {..., "slug": slug.current,"readTime": round(length(body) / 5 / 180 )}`
    );

    return blogs;
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
