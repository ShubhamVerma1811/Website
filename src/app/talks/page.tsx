import { TalkCard } from "components/Talks";
import { PageLayout } from "layouts";
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
			{talks?.map((talk, index) => {
				return <TalkCard key={talk.id} talk={talk} />;
			})}
		</PageLayout>
	);
}
