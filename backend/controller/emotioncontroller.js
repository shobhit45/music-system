const axios = require("axios");
const { searchSongsByEmotion } = require("../utils/spotifyClient");

exports.detectEmotion = async (req, res) => {
  try {
    const { image } = req.body;

    const response = await axios.post("http://127.0.0.1:7000/emotion", {
      image,
    });

    const { emotion } = response.data;

    const recommendedSongs = await searchSongsByEmotion(emotion);

    res.status(200).json({ emotion, songs: recommendedSongs });
  } catch (error) {
    console.error("Emotion detection failed:", error.message);
    res.status(500).json({ error: "Failed to detect emotion." });
  }
};
