import { SpotifyHistoryBar } from "components/craft/SpotifyHistoryBar";
import React from "react";
import { getTopArtists, getTopTracks } from "services/spotify";
import { generateMetaData } from "services/util";
import type { NowPlaying as INowPlaying } from "types/spotify.types";

export const revalidate = 0;

export const metadata = generateMetaData({
	title: "Spotify | Shubham Verma",
	description: "Top artists and top tracks from Spotify.",
});

async function getData() {
	try {
		const [tracksData, artistsData] = await Promise.all([
			getTopTracks(),
			getTopArtists(),
		]);

		if (!tracksData?.items || !artistsData?.items) {
			return { tracks: [], artists: [] };
		}

		// @ts-expect-error
		const tracks: Array<INowPlaying> = tracksData.items.map((song) => {
			const title = song?.name;
			const artist = song?.artists
				.map((_artist: { name: string }) => _artist.name)
				.join(", ");
			const songUrl = song?.external_urls?.spotify;
			const id = song?.id;

			return {
				title,
				artist,
				songUrl,
				id,
			};
		});

		const artists: Array<{
			name: string;
			id: string;
			artistUrl: string;
			//@ts-expect-error
		}> = artistsData.items.map((artist) => {
			return {
				name: artist?.name,
				id: artist?.id,
				artistUrl: artist?.external_urls?.spotify,
			};
		});

		return {
			tracks,
			artists,
		};
	} catch (error) {
		return { tracks: [], artists: [] };
	}
}

export default async function Spotify() {
	const { artists, tracks } = await getData();

	return (
		<React.Fragment>
			<span className="hidden md:inline">
				<SpotifyHistoryBar />
			</span>
			<p className="text-lg text-skin-primary-muted">
				These are the top Spotify tracks and artists that I&apos;ve been
				listening to this month!
			</p>
			<section className="my-12 scroll-m-20" id="top-tracks">
				<a href="#top-tracks">
					<p className="mb-3 font-bold font-secondary text-4xl text-skin-secondary">
						Top Tracks
						<span className="mx-3 font-light text-base">(This Month)</span>
					</p>
				</a>
				<div className="my-12">
					{tracks?.length > 0 ? (
						tracks.map((song, index) => (
							<ol key={song.id}>
								<li>
									<div className="flex flex-row items-start">
										<span className="text-skin-primary-muted">
											{index + 1}.
										</span>
										<div className="ml-3 w-full">
											<a
												href={song?.songUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<p className="text-skin-secondary text-xl underline-offset-4 hover:underline">
													{song?.title}
												</p>
											</a>
											<p className="text-md text-skin-primary-muted">
												{song?.artist}
											</p>
											<hr className="my-4 border-skin-primary-muted" />
										</div>
									</div>
								</li>
							</ol>
						))
					) : (
						<p className="text-lg text-skin-primary-muted">
							No tracks available at the moment. Check back later!
						</p>
					)}
				</div>
			</section>
			<section className="my-12 scroll-m-20" id="top-artists">
				<a href="#top-artists">
					<p className="mb-3 font-bold font-secondary text-4xl text-skin-secondary">
						Top Artists
						<span className="mx-3 font-light text-base">(This Month)</span>
					</p>
				</a>
				<div className="my-12">
					{artists?.length > 0 ? (
						artists.map((artist, index) => (
							<ol key={artist.id}>
								<li>
									<div className="flex flex-row items-start">
										<span className="text-skin-primary-muted">
											{index + 1}.
										</span>
										<div className="ml-3 w-full">
											<a
												href={artist?.artistUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<p className="text-skin-secondary text-xl underline-offset-4 hover:underline">
													{artist?.name}
												</p>
											</a>
											<hr className="my-4 border-skin-primary-muted" />
										</div>
									</div>
								</li>
							</ol>
						))
					) : (
						<p className="text-lg text-skin-primary-muted">
							No artists available at the moment. Check back later!
						</p>
					)}
				</div>
			</section>
		</React.Fragment>
	);
}
