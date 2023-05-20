const express = require("express");
const router = express.Router();
const Volume = require("../models/Volume");

const { getUserAccountType } = require("../services/userServices");

router.get("/ping", (req, res) => {
  res
    .status(200)
    .json({ message: "Connected to Authentication API", req: req.body });
});

router.post("/", (req, res) => {
  const { name, author, published_date, description, user_id } = req.body;

  const userType = getUserAccountType(user_id);

  if (userType == "user") {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    const volume = Volume.create({
      name,
      author,
      published_date,
      description,
    });
  }

  res
    .status(200)
    .json({ message: "Connected to Authentication API", req: req.body });
});

module.exports = router;
