import { ProjectsCard } from "components";
import { SchemaScript } from "components/SchemaScript";
import { PageLayout } from "layouts";
import React from "react";

import { projectsService } from "services/projects";
import { getProfilePageGraph, getProjectsGraph } from "services/schemas";
import { generateMetaData } from "services/util";

export const revalidate = 86400;

export const metadata = generateMetaData({
	title: "Shubham Verma | Software Engineer",
	description:
		"Software Engineer, Likes to build open source tools and write articles.",
});

async function getData() {
	const projects = await projectsService.getProjects();

	return {
		projects,
	};
}

export default async function Home() {
	const { projects } = await getData();

	return (
		<React.Fragment>
			<PageLayout>
				{projects?.map((project) => {
					return <ProjectsCard key={project.title} project={project} />;
				})}
			</PageLayout>
			<SchemaScript
				scripts={[
					{ id: "home-graph", json: getProfilePageGraph() },
					{ id: "projects-graph", json: getProjectsGraph(projects) },
				]}
			/>
		</React.Fragment>
	);
}
