"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWebHaptics } from "web-haptics/react";
// import { NowPlaying } from "./NowPlaying";

const footerLinks = {
	site: [
		{
			name: "Work",
			href: "/work",
		},
		// {
		//   name: 'Craft',
		//   href: '/craft'
		// },
		{
			name: "Socials",
			href: "/socials",
		},
		// {
		// 	name: "Spotify",
		// 	href: "/spotify",
		// },
		{
			name: "RSS",
			href: "/rss.xml",
		},
	],
};

export const Footer = () => {
	const path = usePathname();
	const { trigger } = useWebHaptics();

	return (
		<footer className="body-font mt-auto bg-skin-primary">
			{/*<hr className="my-4 border-skin-primary-muted" />*/}
			{/*<NowPlaying />*/}
			<hr className="my-4 border-skin-primary-muted" />
			<ul className="flex flex-row gap-4">
				{footerLinks.site.map((link, index) => {
					return (
						<li
							key={link.href}
							data-umami-event={`footer-${link.name}`}
							className={`my-2 w-max cursor-pointer list-none hover:underline hover:underline-offset-4 ${
								path === link.href
									? "text-skin-secondary"
									: "text-skin-primary-muted"
							}
              `}
						>
							<Link onClick={() => trigger()} href={link.href}>
								{link.name}
							</Link>
						</li>
					);
				})}
			</ul>
		</footer>
	);
};
