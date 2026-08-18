import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { blogsService } from "services/blogs";

export async function POST(req: NextRequest) {
	try {
		const cookieStore = await cookies();
		const isPreview = cookieStore.has("__prerender_bypass");

		if (isPreview) {
			return NextResponse.json(
				{ message: "Forbidden for Preview Mode" },
				{ status: 403 }
			);
		}

		const { page_id } = await req.json();
		const doc = await blogsService.incrementViews(page_id);
		return NextResponse.json(doc);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	}
}
