import { DiagonalArrow } from "components";
import { WorkHistory } from "components/WorkHistory";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { HIRE_MAIL, RESUME_URL } from "services/constants";
import { generateMetaData } from "services/util";
import { worksService } from "services/work";

export const metadata: Metadata = generateMetaData({
	title: "Experience | Shubham Verma",
});

export default async function WorkPage() {
	const works = await worksService.getWorks();

	return (
		<React.Fragment>
			<p className="mb-6 font-extrabold font-secondary text-3xl text-skin-secondary">
				Work
			</p>
			<div className="-mt-3 mb-6 flex flex-wrap items-center">
				<a
					target="_blank"
					href={`mailto:${HIRE_MAIL}`}
					data-umami-event="hero-calendar"
					className="mt-3 w-max rounded-md p-2 text-lg text-md text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted md:text-lg"
					rel="noopener noreferrer"
				>
					Hire Me
					<DiagonalArrow className="inline text-xl" />
				</a>
				<Link
					href={RESUME_URL}
					target="_blank"
					rel="noopener noreferrer"
					data-umami-event="hero-resume"
					className="mt-3 mr-2 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted"
				>
					Resume
					<DiagonalArrow className="inline text-xl" />
				</Link>
			</div>

			<WorkHistory works={works} />
		</React.Fragment>
	);
}
