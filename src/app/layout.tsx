import { BackToTop, Banner, Footer, Header } from "components";
import { SchemaScript } from "components/SchemaScript";
import { ThemeProvider } from "providers/ThemeProvider";
import { TWITTER_HANDLE } from "services/constants";
import { personSchema, websiteSchema } from "services/schemas";
import "../styles/global.css";
import "../styles/tailwind.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<meta name="application-name" content="Shubham Verma" />
				<meta name="theme-color" content="#000000" />
				<meta property="og:site_name" content="Shubham Verma" />
				<meta property="og:locale" content="en_US" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content={TWITTER_HANDLE} />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="alternate"
					type="application/rss+xml"
					title="Blogs by Shubham Verma"
					href="/rss.xml"
				/>
				<SchemaScript
					scripts={[
						{ id: "website-schema", json: websiteSchema },
						{ id: "person-schema", json: personSchema },
					]}
				/>
				<script
					async
					defer
					data-website-id={process.env.NEXT_PUBLIC_UMAMI_UUID}
					src={process.env.NEXT_PUBLIC_UMAMI_URI}
					data-do-not-track="true"
				/>
			</head>
			<ThemeProvider>
				<body className="dark bg-skin-primary">
					<Banner />
					<div className="mx-5 flex h-[100dvh] max-w-4xl flex-col sm:mx-12 md:mx-32 lg:mx-auto">
						<Header />
						<main>{children}</main>
						<Footer />
					</div>
					<BackToTop />
				</body>
			</ThemeProvider>
		</html>
	);
}
