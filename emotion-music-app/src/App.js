import React from "react";
import Webcamcapture from "./components/Webcamcapture";

function App() {
  return (
    <div className="relative h-auto w-full overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Webcamcapture />
    </div>
  );
}

export default App;
