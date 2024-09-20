import type { Metadata } from "next";

export function generateMetaData({
	title,
	description,
}: {
	title: string;
	description?: string;
}): Metadata {
	return {
		metadataBase: new URL(process.env.DOMAIN!),
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			images: [
				{
					url: `${process.env.DOMAIN}/api/og?title=${title}&desc=${description}`,
				},
			],
		},
	};
}
