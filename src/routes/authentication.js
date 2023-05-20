const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/ping", (req, res) => {
  res
    .status(200)
    .json({ message: "Connected to Authentication API", req: req.body });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      // Get True if password is correct
      isPassOk = await user.comparePassword(password);
      if (isPassOk) {
        res
          .status(200)
          .json({ message: "User logged in successfully", user_id: user.id });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  //   console.log(req.body);

  try {
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user_id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

module.exports = router;
