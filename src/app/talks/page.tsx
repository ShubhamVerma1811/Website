import { SchemaScript } from "components/SchemaScript";
import { TalkCard } from "components/Talks";
import { PageLayout } from "layouts";
import { getTalksGraph } from "services/schemas";
import { talksService } from "services/talks";
import { generateMetaData } from "services/util";

export const metadata = generateMetaData({
	title: "Talks | Shubham Verma",
	description: "Talks I have given at conferences and meetups.",
});

async function getData() {
	const talks = await talksService.getTalks();

	return {
		talks,
	};
}

export default async function TalkPage() {
	const { talks } = await getData();

	return (
		<PageLayout>
			{talks?.map((talk) => {
				return <TalkCard key={talk.id} talk={talk} />;
			})}
			<SchemaScript
				scripts={[{ id: "talks-graph", json: getTalksGraph(talks) }]}
			/>
		</PageLayout>
	);
}
