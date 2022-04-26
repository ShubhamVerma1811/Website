const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const SPOTIFY_NOW_PLAYING_ENDPOINT = process.env.SPOTIFY_NOW_PLAYING_ENDPOINT!;
const SPOTIFY_TOKEN_ENDPOINT = process.env.SPOTIFY_TOKEN_ENDPOINT!;
const TOP_TRACKS_ENDPOINT = process.env.TOP_TRACKS_ENDPOINT!;
const TOP_ARTISTS_ENDPOINT = process.env.TOP_ARTISTS_ENDPOINT!;
const AUDIO_ANALYSIS_ENDPOINT = process.env.AUDIO_ANALYSIS_ENDPOINT!;

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
    // @ts-ignore
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
  // @ts-ignore
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT + '?limit=10', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopArtists = async () => {
  // @ts-ignore
  const { access_token } = await getAccessToken();

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getAudioAnalysis = async (id: string) => {
  // @ts-ignore
  const { access_token } = await getAccessToken();

  return fetch(AUDIO_ANALYSIS_ENDPOINT + `${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUserProfile = async (id: string) => {
  // @ts-ignore
  const { access_token } = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
