const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Predefined Spotify playlist URLs mapped to emotions
const emotionToPlaylist = {
  happy: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",       // Happy Hits!
  sad: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",         // Sad Songs
  angry: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP",       // Rock Hard
  fearful: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",     // Dark & Stormy
  neutral: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",     // Chill Vibes
  disgust: "https://open.spotify.com/playlist/37i9dQZF1DX6GwdWRQMQpq",     // Alternative Beats
  surprised: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",   // Fresh Finds
};

const getSpotifyAccessToken = async () => {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
};

const searchSongsByEmotion = async (emotion) => {
  try {
    await getSpotifyAccessToken();

    const playlistUrl = emotionToPlaylist[emotion.toLowerCase()];
    if (playlistUrl) {
      return {
        type: "playlist",
        url: playlistUrl,
      };
    }

    // If no predefined playlist, fallback to track search
    const response = await spotifyApi.searchTracks(emotion, {
      limit: 5,
    });

    const tracks = response.body.tracks.items.map((track) => ({
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      url: track.external_urls.spotify,
    }));

    return {
      type: "tracks",
      results: tracks,
    };
  } catch (err) {
    console.error("Spotify Error:", err.message);
    return {
      type: "error",
      message: "Something went wrong while fetching music from Spotify.",
    };
  }
};

module.exports = { searchSongsByEmotion };
