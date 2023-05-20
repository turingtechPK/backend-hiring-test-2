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

  if (!validUser_Id || !validName) {
    res.status(400).json({ message: "Failed to create Bookshelf, User Error" });
  } else {
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
  }
});

router.get("/", async (req, res) => {
  const { user_id } = req.body;

  //   const validUser_Id = await checkUserId(user_id);

  try {
    const bookshelf = await Bookshelf.find({ user: user_id });
    console.log(bookshelf.length);
    if (bookshelf.length === 0) {
      res.status(404).json({
        message: "No Bookshelf!",
      });
    } else {
      res.status(200).json({
        message: "Bookshelf Located!",
        bookshelf,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to locate Bookshelf" });
  }
});

router.put("/addVolumes", async (req, res) => {
  const { bookshelf_id, user_id, volumes } = req.body;

  try {
    const bookshelf = await Bookshelf.findById(bookshelf_id);

    if (user_id != bookshelf.user) {
      res.status(401).json({
        message: "Not Authorized!",
      });
    } else {
      volumes.forEach((vol) => {
        // Check for duplicate or already existing volume
        if (!bookshelf.volumes.includes(vol)) {
          bookshelf.volumes.push(vol);
        }
      });
      bookshelf.save();
      res.status(200).json({
        message: "Volumes Added",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error Occured" });
  }
});

router.put("/", async (req, res) => {
  const { bookshelf_id, user_id, name, visibility } = req.body;

  if (!name) {
    res.status(400).json({ message: "Name Cannot be Null" });
  }

  if (!visibility) {
    res.status(400).json({ message: "Visibility Cannot be Null" });
  } else if (visibility != "public" && visibility != "private") {
    res.status(400).json({ message: "Invalid Visibility" });
  } else {
    try {
      const bookshelf = await Bookshelf.findById(bookshelf_id);
      // check if bookshelf belongs to user
      if (user_id != bookshelf.user) {
        res.status(401).json({
          message: "Not Authorized!",
        });
      } else {
        bookshelf.name = name;
        bookshelf.visibility = visibility;
        bookshelf.save();
        res.status(200).json({
          message: "Bookshelf Updated",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error Occured" });
    }
  }
});

router.delete("/removeVolumes", async (req, res) => {
  const { bookshelf_id, user_id, volumes } = req.body;

  console.log(bookshelf_id, user_id, volumes);

  try {
    const bookshelf = await Bookshelf.findById(bookshelf_id);
    console.log(bookshelf);
    if (user_id != bookshelf.user) {
      res.status(401).json({
        message: "Not Authorized!",
      });
    } else {
      volumes.forEach((volume) => {
        // Remove the volumes
        const index = bookshelf.volumes.indexOf(volume);
        if (index > -1) {
          bookshelf.volumes.splice(index, 1);
        }
      });

      bookshelf.save();
      res.status(200).json({
        message: "Volumes removed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error Occured" });
  }
});

router.delete("/", async (req, res) => {
  const { bookshelf_id } = req.body;

  try {
    const bookshelf = await Bookshelf.findById(bookshelf_id);
    bookshelf.remove();
    res.status(200).json({
      message: "Bookshelf Deleted!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to locate Bookshelf" });
  }
});

module.exports = router;
