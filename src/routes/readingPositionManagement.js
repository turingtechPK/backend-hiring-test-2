const express = require("express");
const router = express.Router();

const { getReadingPosition } = require("../services/readingPositionservices");
const ReadingPosition = require("../models/ReadingPosition");

router.get("/ping", (req, res) => {
  res
    .status(200)
    .json({ message: "Connected to reading Position API", req: req.body });
});

router.post("/", async (req, res) => {
  const { user, volume, lineNumber, wordNumber } = req.body;

  try {
    // look for already existing
    const fetchRP = await getReadingPosition(user, volume);

    if (fetchRP) {
      fetchRP.lineNumber = lineNumber;
      fetchRP.wordNumber = wordNumber;

      fetchRP.save();

      res.status(200).json({
        message: "Updated!",
        fetchRP,
      });
    } else {
      const rPos = await ReadingPosition({
        user: user,
        volume: volume,
        lineNumber: lineNumber,
        wordNumber: wordNumber,
      });
      rPos.save();
      res.status(200).json({
        message: "created!",
        rPos,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error occured" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const { user, volume } = req.body;

  try {
    // look for already existing
    const fetchRP = await getReadingPosition(user, volume);

    if (fetchRP) {
      res.status(200).json({
        message: "Sucess!",
        fetchRP,
      });
    } else {
      res.status(404).json({
        message: "Not found!",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error occured" });
    console.log(err);
  }
});

module.exports = router;
