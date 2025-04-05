const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const getSpotifyAccessToken = async () => {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
};

const searchSongsByEmotion = async (emotion) => {
  try {
    await getSpotifyAccessToken();

    const response = await spotifyApi.searchTracks(emotion, {
      limit: 5,
    });

    const tracks = response.body.tracks.items.map((track) => ({
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      url: track.external_urls.spotify,
    }));

    return tracks;
  } catch (err) {
    console.error("Spotify Error:", err.message);
    return [];
  }
};

module.exports = { searchSongsByEmotion };
