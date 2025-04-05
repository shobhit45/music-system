const express = require("express");
const router = express.Router();
const { detectEmotion } = require("../controller/emotioncontroller");

router.post("/", detectEmotion);

module.exports = router;
