import { DiagonalArrow } from "components/Icons";
import React from "react";

import { socialsService } from "services/socials";
import { generateMetaData } from "services/util";

export const metadata = generateMetaData({
	title: "Socials | Shubham Verma",
	description: "Links to my socials.",
});

async function getData() {
	const socials = await socialsService.getSocials();

	return {
		socials,
	};
}

const Socials = async () => {
	const { socials } = await getData();

	return (
		<React.Fragment>
			<p className="mb-6 font-extrabold font-secondary text-3xl text-skin-secondary">
				Socials
			</p>
			<div className="my-5">
				<ul className="flex flex-wrap">
					{socials?.map((social) => {
						return (
							<li key={social.id} className="my-3">
								<a
									style={{
										color: social?.color,
									}}
									target="_blank"
									href={social.url}
									data-umami-event={`socials-${social.name}`}
									className="mt-3 mr-5 w-max rounded-md p-2 text-skin-secondary text-xl hover:bg-skin-secondary-muted"
									rel="noopener noreferrer"
								>
									<strong> {social.name}</strong>
									<DiagonalArrow className="inline text-xl" />
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</React.Fragment>
	);
};

export default Socials;
