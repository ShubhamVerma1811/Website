import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const font = fetch(
	new URL("../../../../public/assets/fonts/Karla/Karla.woff", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
	const fontData = await font;

	const { searchParams } = new URL(request.url);

	const title = searchParams.has("title")
		? searchParams.get("title")
		: "My default title";

	const desc = searchParams.has("desc") ? searchParams.get("desc") : null;
	const img = searchParams.has("img") ? searchParams.get("img") : null;
	const readTime = searchParams.has("readTime")
		? searchParams.get("readTime")
		: null;
	const date = searchParams.has("date") ? searchParams.get("date") : null;
	const author = searchParams.has("author") ? searchParams.get("author") : null;

	return new ImageResponse(
		<div tw="h-full w-full flex flex-col bg-gray-200 items-center relative">
			<h1 tw="text-7xl font-bold mt-20 mx-20 text-center">{title}</h1>
			{desc && <p tw="text-3xl font-normal mt-8 mx-20 text-center">{desc}</p>}
			<p tw="text-xl font-medium mt-6 mx-20 text-center">
				{author && `By ${author}`} {date && `• ${date}`}{" "}
				{readTime && `• ${readTime} min read`}
			</p>
			<div tw="shadow-2xl bg-gray-300 flex absolute bottom-0 rounded-t-3xl w-[900px] h-[400px] overflow-hidden">
				<img
					tw="overflow-hidden w-[900px] h-[400px]"
					src={
						img ??
						"https://images.unsplash.com/photo-1444065707204-12decac917e8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8bW91bnRhaW5zfHx8fHx8MTY3MDIxNzYyMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
					}
					alt={"og-image"}
				/>
			</div>
		</div>,
		{
			width: 1600,
			height: 840,
			fonts: [
				{
					name: "Karla",
					data: fontData,
					style: "normal",
				},
			],
		}
	);
}
