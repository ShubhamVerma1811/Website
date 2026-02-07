import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { getClient } from "services/sanity-server";

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
		const doc = await getClient(false).mutate([
			{
				patch: {
					id: page_id,
					inc: {
						views: 1,
					},
				},
			},
		]);
		return NextResponse.json(doc);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	}
}
