import React from "react";
import Webcamcapture from "./components/Webcamcapture";

function App() {
  return (
    <div className="min-h-screen bg-white py-6">
      <h1 className="text-4xl font-bold text-center text-blue-700">
        Emotion-Based Music Recommender 🎧
      </h1>
      <Webcamcapture />
    </div>
  );
}

export default App;
