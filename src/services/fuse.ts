import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getClient } from "./sanity-server";

export async function generateBlogFuseData() {
	const blogs = await getClient().fetch(
		`*[_type == "post" && !defined(publicationUrl)] |{title, "slug":slug.current}`
	);

	const filePath = "src/fuse/data.json";

	await mkdir(path.dirname(filePath), { recursive: true });
	await writeFile(filePath, JSON.stringify(blogs), "utf8");
}

generateBlogFuseData();
