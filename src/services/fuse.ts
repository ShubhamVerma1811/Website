import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getClient } from "./sanity-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateBlogFuseData() {
	const blogs = await getClient().fetch(
		`*[_type == "post" && !defined(publicationUrl)] |{title, "slug":slug.current}`
	);

	const filePath = path.join(__dirname, "..", "fuse", "data.json");

	await mkdir(path.dirname(filePath), { recursive: true });
	await writeFile(filePath, JSON.stringify(blogs), "utf8");
}

generateBlogFuseData();
