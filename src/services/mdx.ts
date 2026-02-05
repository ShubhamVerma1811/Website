import { serialize } from 'next-mdx-remote-client/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeResizeImage from 'rehype-image-resize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { transformer } from 'zod';

export function getSerializedMdx(body: string) {
  return serialize({
    source: body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: 'anchor'
              }
            }
          ],
          rehypeCodeTitles,
          [rehypeResizeImage, { transformer }]
          // rehypeImageBlur
        ]
      }
    }
  });
}
