"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { Song } from "services/spotify";

type Section = "queue" | "recently";

// TODO:: maybe context instead of prop drilling.

const initialSongs: Song[] = [
	{
		idx: 0,
		id: "7KHz9ozYcZfGMn5IQxsy33",
		artist: "DIVINE, Raja Kumari",
		title: "Roots (feat. Raja Kumari)",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b2730ec6a95396ec0553cd3ab496",
		previewUrl:
			"https://p.scdn.co/mp3-preview/3c1d2a6fff091bfe1342830686e6ab554b36e830?cid=cfe923b2d660439caf2b557b21f31221",
	},
	{
		idx: 1,
		id: "0OA00aPt3BV10qeMIs3meW",
		artist: "Hanumankind, Kalmi",
		title: "Big Dawgs",
		imageUrl:
			"https://i.scdn.co/image/ab67616d00001e02d9afe5c70c43cb2bd34605ea",
		previewUrl:
			"https://p.scdn.co/mp3-preview/d2514a74db6db24e9d1667074a8e7ff8c42d51bf?cid=513092d68c664408b82a4db4a2afa861",
	},
	{
		idx: 2,
		id: "7mLXXOYfVQdBHkrI6HASt8",
		artist: "Connor Price, Nic D, 4Korners",
		title: "Swing",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b27303493959de43659b60c4b7f4",
		previewUrl:
			"https://p.scdn.co/mp3-preview/1f6d40e975891d59af1104b5863c8f9379758ee7?cid=cfe923b2d660439caf2b557b21f31221",
	},
	{
		idx: 3,
		id: "2kQ4qdEtzWR1scQBlsjl8M",
		artist: "Faris Shafi, Umair Butt, Gharvi Group",
		title: "Blockbuster",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b27374a0dfa33a8d19e47f7314b6",
		previewUrl:
			"https://p.scdn.co/mp3-preview/297dd5ac23e5769eb4789cf454f64bb07b5bdb03?cid=cfe923b2d660439caf2b557b21f31221",
	},
	{
		idx: 4,
		id: "2tudvzsrR56uom6smgOcSf",
		artist: "Future, Metro Boomin, Kendrick Lamar",
		title: "Like That",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b273a46b07c291e6dfdee13b3ee8",
		previewUrl:
			"https://p.scdn.co/mp3-preview/793f43da71fe668c35b72a38ae7f93e783823e17?cid=cfe923b2d660439caf2b557b21f31221",
	},

	{
		idx: 5,
		id: "0DPjmMiDoPiMNPTtorAMeY",
		artist: "Seedhe Maut, Sez on the Beat",
		title: "Shaktimaan",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b2734075c0a5794d989b81d01e4f",
		previewUrl:
			"https://p.scdn.co/mp3-preview/10131d2a253bae97bf47a892440a7e83946f5cef?cid=cfe923b2d660439caf2b557b21f31221",
	},
	{
		idx: 6,
		id: "2Tc8PNcBdBnu0MfwxmwZc5",
		artist: "Seedhe Maut, Sez on the Beat",
		title: "MMM",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b2733d8355e9316ac23d60c1a338",
		previewUrl:
			"https://p.scdn.co/mp3-preview/fdd76d32db4b7ea822b7092953bc5243261f5221?cid=cfe923b2d660439caf2b557b21f31221",
	},
	{
		idx: 7,
		id: "0JtIWgsblOvJfpoyhGkFuS",
		artist: "Eminem",
		title: "Mockingbird",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b273dfd0ebe9b4b99f621f376453",
		previewUrl:
			"https://p.scdn.co/mp3-preview/43887419c9301358d28b7d487dfeb078f9668a6a?cid=cfe923b2d660439caf2b557b21f31221",
	},
	{
		idx: 8,
		id: "08Isz2ETWSBhvIl8UpKYsp",
		artist: "Shubh",
		title: "No Love",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b2732a46046339bd779f95a8cf8b",
		previewUrl:
			"https://p.scdn.co/mp3-preview/bf01e12420b9997eb503c0af333ef3eedbf6e4b1?cid=cfe923b2d660439caf2b557b21f31221",
	},
	{
		idx: 9,
		id: "5a11x5PUFvJEadMRqtNtTr",
		artist: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
		title: "Piya O Re Piya",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b2739546c25ac50268b2b74842e7",
		previewUrl:
			"https://p.scdn.co/mp3-preview/1e2e6c0c4935c8e8e2be50b01c55d01aa63ae932?cid=cfe923b2d660439caf2b557b21f31221",
	},
];

const SpotifyQueue = () => {
	// const { data: initialSongs } = useSWR('/api/spotify/recentlyPlayed', fetcher);

	const [activeSong, setActiveSong] = useState<Song>({} as Song);
	const [songsList, setSongsList] = useState<Array<Song>>([]);
	const [activeSection, setActiveSection] = useState<Section>("queue");
	const audioRef = React.useRef<HTMLAudioElement>(null);
	const [muted, setMuted] = useState(true);

	useEffect(() => {
		if (initialSongs && initialSongs.length > 0) {
			setActiveSong(initialSongs[0]);
			setSongsList(initialSongs.slice(1));
		}
	}, [initialSongs]);

	useEffect(() => {
		if (initialSongs && activeSong) {
			setSongsList(initialSongs.filter((song) => song.idx > activeSong.idx));
		}
	}, [activeSong, initialSongs]);

	useEffect(() => {
		if (activeSong?.previewUrl) {
			audioRef.current?.play();
		}
	}, [activeSong?.previewUrl]);

	const handleEnd = () => {
		// play next song
		const activeIdx = activeSong?.idx;
		if (activeIdx < initialSongs.length - 1) {
			setActiveSong(initialSongs[activeIdx + 1]);
		} else {
			setActiveSong(initialSongs[0]);
		}
	};

	return (
		<div className="spotify h-dvh bg-gray-950">
			<audio
				src={activeSong?.previewUrl}
				controls
				className="hidden"
				onEnded={handleEnd}
				ref={audioRef}
				muted={muted}
			>
				<track kind="captions" />
			</audio>
			<div className="mx-auto bg-gray-950 p-4 lg:w-[600px]">
				<NavBar
					setActiveSection={setActiveSection}
					activeSection={activeSection}
					setMuted={setMuted}
					muted={muted}
				/>

				<AnimatePresence initial={false}>
					{activeSection === "queue" ? (
						<QueueUI
							activeSong={activeSong}
							songsList={songsList}
							setActiveSong={setActiveSong}
							setSongsList={setSongsList}
							initialSongs={initialSongs}
						/>
					) : (
						<RecentlyPlayedUI
							activeSong={activeSong}
							initialSongs={initialSongs}
						/>
					)}
				</AnimatePresence>
			</div>
			<style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital@0;1&display=swap');

        .spotify > * {
          font-family: 'Work Sans', sans-serif;
        }
      `}</style>
		</div>
	);
};

function NavBar({
	setActiveSection,
	activeSection,
	setMuted,
	muted,
}: {
	setActiveSection: (section: Section) => void;
	activeSection: Section;
	setMuted: (muted: boolean) => void;
	muted: boolean;
}) {
	return (
		<div className="flex flex-row items-center gap-4">
			<motion.button onClick={() => setActiveSection("queue")}>
				<p
					className={`border-b-2 pb-2 font-bold ${
						activeSection === "queue"
							? "border-[#1ED760] text-white"
							: "border-transparent text-gray-400"
					}`}
				>
					Queue
				</p>
			</motion.button>
			<motion.button onClick={() => setActiveSection("recently")}>
				<p
					className={`border-b-2 pb-2 font-bold ${
						activeSection === "recently"
							? "border-[#1ED760] text-white"
							: "border-transparent text-gray-400"
					}`}
				>
					Recently Played
				</p>
			</motion.button>
			<div className="ml-auto">
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-950"
					// @ts-expect-error
					onClick={() => setMuted((p) => !p)}
				>
					{muted ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							// width='32'
							// height='32'
							className="size-6 text-white"
							viewBox="0 0 24 24"
						>
							<title>Mute</title>
							<path
								fill="#888888"
								d="M4.34 2.93L2.93 4.34L7.29 8.7L7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06a8.94 8.94 0 0 0 3.61-1.75l2.05 2.05l1.41-1.41zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71m-7-8l-1.88 1.88L12 7.76zm4.5 8A4.5 4.5 0 0 0 14 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							// width='32'
							// height='32'
							className="size-6 text-white"
							viewBox="0 0 24 24"
						>
							<title>Unmute</title>
							<path
								fill="#888888"
								d="M11.553 3.064A.75.75 0 0 1 12 3.75v16.5a.75.75 0 0 1-1.255.555L5.46 16H2.75A1.75 1.75 0 0 1 1 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.75.75 0 0 1 .808-.13ZM10.5 5.445l-4.245 3.86a.75.75 0 0 1-.505.195h-3a.25.25 0 0 0-.25.25v4.5c0 .138.112.25.25.25h3c.187 0 .367.069.505.195l4.245 3.86Zm8.218-1.223a.75.75 0 0 1 1.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 0 1-1.06-1.06a9.5 9.5 0 0 0 0-13.436a.75.75 0 0 1 0-1.06"
							/>
							<path
								fill="#888888"
								d="M16.243 7.757a.75.75 0 1 0-1.061 1.061a4.5 4.5 0 0 1 0 6.364a.75.75 0 0 0 1.06 1.06a6 6 0 0 0 0-8.485Z"
							/>
						</svg>
					)}
				</div>
			</div>
		</div>
	);
}

function QueueUI({
	activeSong,
	songsList,
	initialSongs,
	setActiveSong,
	setSongsList,
}: {
	activeSong: Song;
	songsList: Array<Song>;
	initialSongs: Array<Song>;
	setActiveSong: (song: Song) => void;
	setSongsList: (songs: Array<Song>) => void;
}) {
	return (
		<motion.div
			key="queue-ui"
			initial={{ x: -20 }}
			animate={{ x: 0 }}
			exit={{ x: 100 }}
		>
			<div className="my-4">
				<p className="pb-2 font-bold text-white">Now Playing</p>
				<AnimatePresence mode="popLayout">
					{activeSong ? (
						<SongItem song={activeSong} setActiveSong={setActiveSong} />
					) : null}
				</AnimatePresence>
			</div>

			<div className="my-4">
				<AnimatePresence>
					{!songsList?.length ? (
						<>
							<p className="font-lg text-white">
								Queue empty,{" "}
								{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
								<span
									className={
										"cursor-pointer text-[#1ED760] underline underline-offset-2"
									}
									onClick={() => {
										setSongsList(initialSongs.slice(1));
										setActiveSong(initialSongs[0]);
									}}
								>
									Click to restart.
								</span>
							</p>
						</>
					) : (
						<>
							<motion.p layout className="pb-2 font-bold text-white">
								Next from: Liked Songs
							</motion.p>

							{songsList?.map((song) => {
								return song.idx <= activeSong?.idx ? null : (
									<AnimatePresence key={song.id} mode="popLayout">
										<SongItem song={song} setActiveSong={setActiveSong} />
									</AnimatePresence>
								);
							})}
						</>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}

function RecentlyPlayedUI({
	activeSong,
	initialSongs,
}: {
	activeSong: Song;
	initialSongs: Array<Song>;
}) {
	const prevSongs = initialSongs.slice(0, activeSong?.idx);

	if (!prevSongs.length) {
		return (
			<motion.p
				key="recent-ui"
				initial={{ x: 20 }}
				animate={{ x: 0 }}
				className="my-5 text-lg text-white"
			>
				Recent songs empty
			</motion.p>
		);
	}

	return (
		<motion.div key="recent-ui" initial={{ x: 20 }} animate={{ x: 0 }}>
			{prevSongs.map((song) => {
				return (
					<div key={song.id}>
						<div className="my-3 flex cursor-pointer flex-row items-center rounded-md">
							<Image
								width={40}
								height={40}
								src={song.imageUrl}
								alt={song.title}
								className="h-10 w-10 rounded-md"
							/>
							<div className="ml-3">
								<p className="text-[#1ED760] text-md">{song.title}</p>
								<p className="text-gray-400">{song.artist}</p>
							</div>
						</div>
					</div>
				);
			})}
		</motion.div>
	);
}

const SongItem = ({
	song,
	setActiveSong,
}: {
	song: Song;
	setActiveSong: (song: Song) => void;
}) => {
	return (
		<motion.div
			key={song.id}
			layoutId={`song-${song.id}`}
			className="ounded-md my-3 flex cursor-pointer flex-row items-center"
			onClick={() => setActiveSong(song)}
		>
			<motion.img
				layoutId={`song-image-${song.id}`}
				src={song.imageUrl}
				alt={song.title}
				className="h-10 w-10 rounded-md"
			/>
			<div className="ml-3">
				<motion.p
					layoutId={`song-title-${song.id}`}
					className="text-[#1ED760] text-md"
				>
					{song.title}
				</motion.p>
				<motion.p layoutId={`song-artist-${song.id}`} className="text-gray-400">
					{song.artist}
				</motion.p>
			</div>
		</motion.div>
	);
};

export default SpotifyQueue;
