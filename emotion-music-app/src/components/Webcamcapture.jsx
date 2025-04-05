import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Webcamcapture = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured image:", imageSrc); // Debugging
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/emotion", {
        image: imageSrc,
      });

      console.log("Emotion response:", res.data); // Debugging
      setEmotion(res.data.emotion);
      setSongs(res.data.songs);
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      alert("Error detecting emotion");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10 px-4">
      <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        className="rounded-xl shadow-lg"
      />

      <button
        onClick={capture}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Detect Emotion
      </button>

      {loading && <p className="text-gray-600">Detecting emotion...</p>}

      {emotion && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-2xl text-center font-semibold text-green-600 mb-4">
            Emotion: {emotion.toUpperCase()}
          </h2>

          <div className="space-y-4">
            {songs.map((song, i) => (
              <a
                key={i}
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-100 hover:bg-green-100 rounded shadow"
              >
                <p className="font-bold">{song.title}</p>
                <p className="text-sm text-gray-700">{song.artist}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Webcamcapture;
