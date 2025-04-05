const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const emotionRoutes = require("./routes/emotion");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // To handle base64 images
app.use("/api/emotion", emotionRoutes);

app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});
