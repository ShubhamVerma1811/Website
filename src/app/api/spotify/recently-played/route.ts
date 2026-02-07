import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "services/spotify";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
	try {
		const tracks = await getRecentlyPlayed();
		return NextResponse.json(tracks.slice(0, 10));
	} catch (error) {
		console.error("Error in recently-played API:", error);
		return NextResponse.json(
			{ message: "Failed to fetch recently played tracks" },
			{ status: 500 }
		);
	}
}
