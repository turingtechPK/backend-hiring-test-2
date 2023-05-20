const express = require("express");
const router = express.Router();
const Volume = require("../models/Volume");

const { getUserAccountType } = require("../services/userServices");

router.get("/ping", (req, res) => {
  res
    .status(200)
    .json({ message: "Connected to Authentication API", req: req.body });
});

router.post("/", async (req, res) => {
  const { name, author, published_date, description, user_id } = req.body;

  const userType = await getUserAccountType(user_id);

  if (userType == "user") {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const volume = await Volume.create({
        name,
        author,
        published_date,
        description,
      });

      res.status(201).json({
        message: "Volume Created!",
        volume,
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to create volume" });
      console.log(err);
    }
  }
});

router.get("/", async (req, res) => {
  const { name } = req.body;

  try {
    const result = await Volume.find({ name: name });
    res.status(200).json({ message: "Successful", result });
  } catch {
    res.status(500).json({ message: "Failed to locate Bookshelf" });
  }
});

module.exports = router;
