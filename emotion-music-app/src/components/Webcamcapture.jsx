import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import FullScreenBackground from "./Fullscreenbg"; // Import the background component

const Webcamcapture = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [songs, setSongs] = useState([]);
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true);
    setEmotion(null);
    setSongs([]);
    setPlaylistUrl(null);

    try {
      const res = await axios.post("http://localhost:5000/api/emotion", {
        image: imageSrc,
      });

      const { emotion, songs } = res.data;
      setEmotion(emotion);

      if (songs.type === "playlist") {
        setPlaylistUrl(songs.url);
      } else if (songs.type === "tracks") {
        setSongs(songs.results);
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Error detecting emotion");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-gradient-to-br from-gray-600 via-black to-gray-500">
      {/* Full-Screen Moving Background */}
      <FullScreenBackground />

      {/* Foreground Content */}
      <div className="absolute inset-0 flex flex-col items-center text-white z-10">
        {/* Title & Tagline */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-green-400 drop-shadow-lg mb-2">
            Mood Melody
          </h1>
          <p className="text-lg md:text-xl text-blue-300 italic">
            Feel the vibe. Hear the harmony.
          </p>
        </div>

        {/* Webcam Display */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-xl border border-green-500">
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            className="rounded-xl"
          />
        </div>

        {/* Capture Button */}
        <button
          onClick={capture}
          className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition shadow-lg"
        >
          Detect Emotion
        </button>

        {/* Loading Indicator */}
        {loading && <p className="mt-4 text-lg text-blue-300">Detecting emotion...</p>}

        {/* Emotion & Result */}
        {emotion && (
          <div className="mt-8 w-full max-w-4xl bg-gray-800 p-6 rounded-xl shadow-lg text-white border border-blue-500">
            <h2 className="text-2xl font-semibold text-center text-blue-400 mb-4">
              Detected Emotion: {emotion.toUpperCase()}
            </h2>

            {playlistUrl ? (
              <div className="text-center">
                <iframe
                  src={`https://open.spotify.com/embed/playlist/${playlistUrl.split("/playlist/")[1]}`}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="encrypted-media"
                  className="rounded-lg"
                ></iframe>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {songs.map((song, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition"
                  >
                    <p className="font-bold text-green-400 truncate">{song.title}</p>
                    <p className="text-sm text-gray-300 truncate">{song.artist}</p>
                    <iframe
                      src={`https://open.spotify.com/embed/track/${song.url.split("/track/")[1]}`}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allow="encrypted-media"
                      className="rounded-lg mt-2"
                    ></iframe>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Webcamcapture;