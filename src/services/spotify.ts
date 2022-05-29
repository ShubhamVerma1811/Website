const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const SPOTIFY_NOW_PLAYING_ENDPOINT = process.env.SPOTIFY_NOW_PLAYING_ENDPOINT!;
const SPOTIFY_TOKEN_ENDPOINT = process.env.SPOTIFY_TOKEN_ENDPOINT!;
const SPOTIFY_TOP_TRACKS_ENDPOINT = process.env.SPOTIFY_TOP_TRACKS_ENDPOINT!;
const SPOTIFY_TOP_ARTISTS_ENDPOINT = process.env.SPOTIFY_TOP_ARTISTS_ENDPOINT!;

export const getAccessToken = async () => {
  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();

    return fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(
    SPOTIFY_TOP_TRACKS_ENDPOINT + '?limit=10&time_range=short_term',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
};

export const getTopArtists = async () => {
  const { access_token } = await getAccessToken();

  return fetch(
    SPOTIFY_TOP_ARTISTS_ENDPOINT + '?limit=10&time_range=short_term',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
};
