import Link from "next/link";
import React from "react";
import type { Talk as ITalk } from "types";

export const TalkCard = ({ talk }: { talk: ITalk }) => {
	return (
		<React.Fragment>
			<Link
				href={talk.url}
				passHref
				target="_blank"
				rel="noopener noreferrer"
				data-umami-event={`umami--click--talk-${talk.title
					.split(" ")
					.join("-")}`}
			>
				<div className="my-4 cursor-pointer rounded-md bg-skin-secondary-muted p-3 transition-all hover:scale-[1.02]">
					<div className="flex items-center justify-between">
						<p className="text-skin-secondary text-xl">{talk.title}</p>
						{talk.time && (
							<p className="ml-2 text-skin-secondary text-xl">{talk.time}</p>
						)}
					</div>
					{talk.description && (
						<p className="my-1 text-skin-primary-muted">{talk.description}</p>
					)}
				</div>
			</Link>
		</React.Fragment>
	);
};
