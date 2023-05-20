const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/ping", (req, res) => {
  res
    .status(200)
    .json({ message: "Connected to Authentication API", req: req.body });
});

module.exports = router;
