const express = require("express");
const router = express.Router();

const { checkUserId } = require("../services/userServices");
const { checkNameExists } = require("../services/bookServices");
const Bookshelf = require("../models/Bookshelf");

router.get("/ping", (req, res) => {
  res
    .status(200)
    .json({ message: "Connected to Bookshelf API", req: req.body });
});

router.post("/", async (req, res) => {
  const { user_id, name, visibility } = req.body;

  const validUser_Id = await checkUserId(user_id);
  const validName = checkNameExists(user_id, name);

  if (!validUser_Id || validName) {
    res.status(400).json({ message: "Failed to create Bookshelf, User Error" });
  }

  try {
    const bookshelf = await Bookshelf.create({
      name: name,
      visibility: visibility,
      user: user_id,
    });
    res.status(201).json({
      message: "Bookshelf created successfully",
      bookshelf_id: bookshelf.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Bookshelf" });
  }
});

router.get("/", async (req, res) => {
  const { user_id } = req.body;

  //   const validUser_Id = await checkUserId(user_id);

  try {
    const bookshelf = await Bookshelf.find({ user: user_id });
    res.status(201).json({
      message: "Bookshelf Located!",
      bookshelf,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to locate Bookshelf" });
  }
});

module.exports = router;
