import { GithubIcon, LinkedInIcon, TwitterIcon } from "components/Icons";
import Link from "next/link";
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from "services/constants";
import ThemeToggler from "./ThemeToggler";

export const Header = () => {
	return (
		<header className="my-5 rounded-md bg-skin-primary" id="header">
			<nav className="flex items-center">
				<div className="ml-0">
					<Link className="font-bold text-2xl text-skin-secondary" href="/">
						<p className="font-bold">🌱</p>
					</Link>
				</div>
				<div className="ml-auto">
					<div className="flex flex-wrap items-center">
						<a
							target="_blank"
							href={TWITTER_URL}
							data-umami-event="hero-twitter"
							className="mr-1 w-max rounded-md p-2 text-[#1DA1F2] text-lg hover:bg-skin-secondary-muted"
							rel="noopener noreferrer"
						>
							<TwitterIcon />
						</a>
						<a
							target="_blank"
							href={GITHUB_URL}
							data-umami-event="hero-github"
							className="mr-1 w-max rounded-md p-2 text-lg text-skin-secondary hover:bg-skin-secondary-muted"
							rel="noopener noreferrer"
						>
							<GithubIcon />
						</a>
						<a
							target="_blank"
							href={LINKEDIN_URL}
							data-umami-event="hero-linkedin"
							className="w-max rounded-md p-2 text-[#0a66c2] text-lg hover:bg-skin-secondary-muted dark:text-[#ffffffe6]"
							rel="noopener noreferrer"
						>
							<LinkedInIcon />
						</a>
						<ThemeToggler />
					</div>
				</div>
			</nav>
		</header>
	);
};
