import { getPlaiceholder } from "plaiceholder";
// @ts-expect-error
import { visit } from "unist-util-visit";

// TODO:: fix types
export default function rehypeImageBlur() {
	// @ts-expect-error
	return async (tree) => {
		// @ts-expect-error
		const nodes = [];

		// @ts-expect-error
		visit(tree, (node) => {
			if (node.tagName === "img") {
				nodes.push(node);
			}
		});

		await Promise.all(
			// @ts-expect-error
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
