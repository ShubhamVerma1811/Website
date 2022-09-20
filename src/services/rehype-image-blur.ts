import { getPlaiceholder } from 'plaiceholder';
import { visit } from 'unist-util-visit';

// TODO:: fix types
export default function rehypeImageBlur() {
  // @ts-ignore
  return async (tree) => {
    // @ts-ignore
    const nodes = [];

    visit(tree, (node) => {
      if (node.tagName === 'img') {
        nodes.push(node);
      }
    });

    await Promise.all(
      // @ts-ignore
      nodes.map(async (node) => {
        if (node.properties.src) {
          node.properties.hash = (
            await getPlaiceholder(node.properties.src)
          ).base64;
        }
      })
    );

    return tree;
  };
}
