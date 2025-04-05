// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Route to handle emotion detection
app.post("/api/emotion", async (req, res) => {
  const image = req.body.image;

  try {
    const response = await axios.post("http://localhost:7000/emotion", {
      image: image,
    });

    const detectedEmotion = response.data.emotion;
    res.json({ emotion: detectedEmotion });
  } catch (error) {
    console.error("Error forwarding image to Python service:", error);
    res.status(500).json({ error: "Failed to detect emotion." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Node.js server running at http://localhost:${PORT}`);
});
