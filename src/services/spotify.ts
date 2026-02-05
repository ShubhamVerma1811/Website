import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

if (!client_id || !client_secret || !refresh_token) {
	throw new Error("Missing required Spotify environment variables");
}

export type Song = {
	idx: number;
	id: string;
	artist: string;
	title: string;
	imageUrl: string;
	previewUrl: string;
};

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

async function refreshAccessToken(): Promise<string> {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(
				`${client_id}:${client_secret}`
			).toString("base64")}`,
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refresh_token,
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to refresh access token");
	}

	const data = await response.json();
	accessToken = data.access_token;
	tokenExpirationTime = Date.now() + data.expires_in * 1000;
	return accessToken;
}

async function getValidAccessToken(): Promise<string> {
	if (
		!accessToken ||
		!tokenExpirationTime ||
		Date.now() >= tokenExpirationTime
	) {
		return refreshAccessToken();
	}
	return accessToken;
}

async function getSpotifyApi(): Promise<SpotifyApi> {
	const token = await getValidAccessToken();
	return SpotifyApi.withAccessToken(client_id, {
		access_token: token,
		token_type: "Bearer",
		expires_in: 3600,
	});
}

export const getNowPlaying = async () => {
	try {
		const spotify = await getSpotifyApi();
		const response = await spotify.player.getCurrentlyPlayingTrack();

		return response;
	} catch (error) {
		console.error("Error getting now playing:", error);
		throw error;
	}
};

export const getTopTracks = async () => {
	try {
		const spotify = await getSpotifyApi();
		const response = await spotify.currentUser.topItems(
			"tracks",
			"short_term",
			10
		);
		return response;
	} catch (error) {
		console.error("Error getting top tracks:", error);
		throw error;
	}
};

export const getTopArtists = async () => {
	try {
		const spotify = await getSpotifyApi();
		const response = await spotify.currentUser.topItems(
			"artists",
			"short_term",
			10
		);
		return response;
	} catch (error) {
		console.error("Error getting top artists:", error);
		throw error;
	}
};

export const getRecentlyPlayed = async () => {
	try {
		const spotify = await getSpotifyApi();
		const response = await spotify.player.getRecentlyPlayedTracks();
		const tracks = response.items.map((item, idx) => ({
			idx,
			id: item.track.id,
			artist: item.track.artists.map((artist) => artist.name).join(", "),
			title: item.track.name,
			imageUrl: item.track.album.images[0].url,
			previewUrl: item.track.preview_url,
			time: new Date(item.played_at),
		}));
		return tracks;
	} catch (error) {
		console.error("Error getting recently played:", error);
		return [];
	}
};
