export const DOMAIN = "https://shubhamverma.me";
export const SHORT_DOMAIN = "https://shubhamverma.me/s";

export const TWITTER_HANDLE = "@verma__shubham";
export const TWITTER_URL = `${SHORT_DOMAIN}/tw`;
export const LINKEDIN_HANDLE = "shubhamverma1811";
export const LINKEDIN_URL = `${SHORT_DOMAIN}/li`;
export const GITHUB_HANDLE = "shubhamverma1811";
export const GITHUB_URL = `${SHORT_DOMAIN}/gh`;
export const INSTAGRAM_URL = `${SHORT_DOMAIN}/ig`;
export const SPOTIFY_URL = `${SHORT_DOMAIN}/sp`;
export const CAL_URL = `${SHORT_DOMAIN}/cal`;
export const CURRENT_ORGANIZATION = "GeekyAnts";
export const CURRENT_TITLE = "Senior Software Engineer - III";
export const RESUME_URL = `${SHORT_DOMAIN}/resume`;
export const HIRE_MAIL = "hi@shubhamverma.me";
export const CITY = "Hyderabad";
export const COUNTRY = "India";

import type { Metadata } from "next";

export function generateMetaData({
	title,
	description,
}: {
	title: string;
	description?: string;
}): Metadata {
	return {
		metadataBase: new URL(DOMAIN),
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			type: "website",
			images: [
				{
					url: `${DOMAIN}/api/og?title=${title}&desc=${description}`,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			creator: TWITTER_HANDLE,
			title: title,
			description: description,
			images: [`${DOMAIN}/api/og?title=${title}&desc=${description}`],
		},
	};
}