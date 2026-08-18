import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

interface RevalidateBody {
	_type: string;
	slug?: string;
}

const REVALIDATORS: Record<string, (body: RevalidateBody) => string[]> = {
	post: (body) => ["/", "/blog", `/blog/${body.slug}`],
	social: () => ["/socials"],
	talk: () => ["/"],
};

export async function POST(request: NextRequest) {
	try {
		if (!process.env.SANITY_WEBHOOK_SECRET_TOKEN) {
			return NextResponse.json({ message: "Server Error" }, { status: 500 });
		}

		if (!process.env.SANITY_WEBHOOK_SECRET_HEADER) {
			return NextResponse.json({ message: "Server Error" }, { status: 500 });
		}

		const headerStore = await headers();
		const token = headerStore.get(process.env.SANITY_WEBHOOK_SECRET_HEADER);

		if (token !== process.env.SANITY_WEBHOOK_SECRET_TOKEN) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const body = (await request.json()) as RevalidateBody;
		const getPaths = REVALIDATORS[body._type];

		if (!getPaths) {
			return NextResponse.json(
				{ message: `No revalidation configured for type "${body._type}"` },
				{ status: 400 }
			);
		}

		for (const path of getPaths(body)) {
			revalidatePath(path);
		}

		return NextResponse.json({ message: `Revalidated ${body._type}` });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	}
}
