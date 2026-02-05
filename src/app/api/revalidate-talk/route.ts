import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		const headerStore = headers();
		const token = headerStore.get(process.env.SANITY_WEBHOOK_SECRET_HEADER!);

		if (token !== process.env.SANITY_WEBHOOK_SECRET_TOKEN) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		await revalidatePath("/");

		return NextResponse.json({ message: "Updated Talks on Index" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	}
}
