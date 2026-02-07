"use client";

import React from "react";

export const BackToTop = () => {
	const [showBackToTop, setShowBackToTop] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setShowBackToTop(true);
			} else {
				setShowBackToTop(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return showBackToTop ? (
		<button
			className="fixed right-5 bottom-5 h-12 w-12 rounded-full border-2 border-skin-primary-muted bg-skin-primary text-2xl text-skin-secondary md:right-12 md:bottom-12"
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			}}
		>
			<svg width="1em" height="1em" viewBox="0 0 24 24" className="m-auto">
				<path
					fill="currentColor"
					d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8l-8 8z"
				></path>
			</svg>
		</button>
	) : null;
};
