import type { TransformerArgs, TransformerResult } from 'rehype-image-resize';

export const transformer = ({
  src,
  alt
}: TransformerArgs): TransformerResult => {
  if (!src || !alt) return null;
  const dimensionsRegex = /\[\[(.*?)\]\]/;
  const dimensions = alt?.match(dimensionsRegex);
  if (dimensions) {
    if (!dimensions?.[1].includes(' x ')) return;
    const [width, height] = dimensions?.[1]?.split(' x ');
    return {
      width,
      height,
      alt: alt.replace(dimensionsRegex, '').trim()
    };
  }
};
