import Image from "next/image";
import React from "react";
import type { Work } from "types";

function DefaultLogo({ company }: { company: string }) {
	return (
		<div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-skin-secondary-muted bg-skin-secondary-muted font-semibold text-skin-primary-muted text-xs">
			{company
				.split(" ")
				.map((w) => w[0])
				.join("")
				.toUpperCase()}
		</div>
	);
}

export function WorkHistory({ works }: { works: Work[] }) {
	return (
		<React.Fragment>
			{works.map((work, wi) => (
				<div
					key={work._id}
					className={`my-2 flex flex-row border-skin-secondary-muted border-l-4 pl-2 md:px-4 lg:flex-row ${wi < works.length - 1 ? "mb-6" : ""}`}
				>
					<div className="mr-3 min-w-8">
						{work.logoUrl ? (
							<Image
								src={work.logoUrl}
								width={40}
								height={40}
								alt={`${work.companyName}-logo`}
							/>
						) : (
							<DefaultLogo company={work.companyName} />
						)}
					</div>
					<div className="w-full">
						<p className="mb-4 whitespace-nowrap font-bold font-secondary text-skin-secondary text-xl">
							{work.companyName}
						</p>
						{(work.clients ?? []).map((client, ci) => (
							<div
								key={client.name}
								className={`flex flex-col md:flex-row ${ci !== (work.clients ?? []).length - 1 ? "border-b-4" : ""} my-2 border-skin-secondary-muted pb-2 md:flex-row`}
							>
								<div className="mr-4 min-w-8">
									{client.logoUrl ? (
										<div className="relative h-10 w-10 rounded-lg bg-skin-secondary-muted">
											<Image
												src={client.logoUrl}
												fill
												alt={`${client.name}-logo`}
												className="object-contain p-1"
											/>
										</div>
									) : (
										<DefaultLogo company={client.name} />
									)}
								</div>
								<div className="w-full">
									<div className="flex items-baseline justify-between">
										<p className="text-balance font-bold font-secondary text-base text-skin-secondary md:text-lg">
											{client.role}
										</p>
										<p className="whitespace-nowrap font-medium text-md text-skin-primary-muted">
											{client.startDate && client.endDate
												? `${client.startDate} - ${client.endDate}`
												: (client.startDate ?? "Present")}
										</p>
									</div>
									<p className="mt-1 text-balance text-skin-secondary text-sm">
										{client.name}
										{client.industry ? ` \u00B7 ${client.industry}` : ""}
										{client.deliverable ? (
											<span className="ml-2 text-skin-primary-muted italic">
												&mdash; {client.deliverable}
											</span>
										) : null}
									</p>
									{client.highlights && client.highlights.length > 0 ? (
										<ul className="mt-2">
											{client.highlights.map((point) => (
												<li
													key={point}
													className="ml-6 list-disc text-skin-secondary"
												>
													<p className="mb-1">{point}</p>
												</li>
											))}
										</ul>
									) : null}
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</React.Fragment>
	);
}
