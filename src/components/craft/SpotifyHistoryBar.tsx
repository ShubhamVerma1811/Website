"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Song } from "services/spotify";

type Data = Song & { time: Date; spotifyUrl: string };

interface SongPillProps {
	song: Data;
	isVisible: boolean;
}

const SongPill = ({ song, isVisible }: SongPillProps) => {
	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, x: -150, y: -20 }}
					animate={{ opacity: 1, x: -170 }}
					exit={{ opacity: 0, x: -150 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="absolute flex w-[160px] -translate-y-1/2 cursor-pointer items-center gap-2 rounded-full bg-[#1DB954] p-1 shadow-lg"
					onClick={() => window.open(song.spotifyUrl, "_blank")}
					role="link"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							window.open(song.spotifyUrl, "_blank");
						}
					}}
				>
					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						className="relative h-8 w-8 shrink-0"
					>
						<Image
							src={song.imageUrl}
							alt={song.title}
							fill
							className="rounded-full object-cover"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="flex min-w-0 flex-col font-medium font-secondary text-skin-primary text-xs"
					>
						<span className="truncate">{song.title}</span>
						<span className="text-[10px]">
							played at -{" "}
							{song.time.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
								hour12: false,
							})}
						</span>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const SpotifyHistoryBar = () => {
	const [height, setHeight] = useState(0);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [recentTracks, setRecentTracks] = useState<Data[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const msInDay = 24 * 60 * 60 * 1000; // Milliseconds in a day

	useEffect(() => {
		// Update height on mount and window resize
		const updateHeight = () => {
			setHeight(window.innerHeight);
		};

		// Set initial height
		updateHeight();

		// Add resize listener
		window.addEventListener("resize", updateHeight);

		// Cleanup
		return () => window.removeEventListener("resize", updateHeight);
	}, []);

	useEffect(() => {
		const fetchTracks = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("/api/spotify/recently-played");

				if (!response.ok) {
					throw new Error("Failed to fetch tracks");
				}

				const data = await response.json();

				// Convert string dates back to Date objects and filter for today's date only
				const now = new Date();
				const today = new Date(
					now.getFullYear(),
					now.getMonth(),
					now.getDate()
				);

				const tracksWithDates = data
					.map((track: any) => ({
						...track,
						time: new Date(track.time),
						spotifyUrl: `https://open.spotify.com/track/${track.id}`,
					}))
					.filter((track: Data) => {
						const trackDate = new Date(
							track.time.getFullYear(),
							track.time.getMonth(),
							track.time.getDate()
						);
						return trackDate.getTime() === today.getTime();
					});

				setRecentTracks(tracksWithDates);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load tracks");
				console.error("Error fetching tracks:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTracks();
	}, []);

	const getPosition = (timestamp: Date) => {
		const timeOfDay =
			(timestamp.getHours() * 3600 +
				timestamp.getMinutes() * 60 +
				timestamp.getSeconds()) *
			1000;
		return (timeOfDay / msInDay) * height;
	};

	if (isLoading) {
		return (
			<div className="fixed top-0 right-0 flex h-dvh items-center pr-4">
				<div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1DB954] border-t-transparent" />
			</div>
		);
	}

	if (error) {
		return null;
	}

	return (
		<div className="fixed top-0 right-0 h-dvh" style={{ height }}>
			<div className={`relative mx-4 h-full w-6 rounded-full`}>
				{recentTracks.map((item, index) => {
					const position = getPosition(item.time);
					return (
						<>
							<div
								key={index}
								className="absolute h-1 w-full -translate-y-1/2 transform cursor-pointer rounded-full bg-[#1DB954]"
								style={{
									top: `${position}px`,
								}}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<SongPill song={item} isVisible={hoveredIndex === index} />
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
};
