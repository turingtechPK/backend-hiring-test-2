const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res
    .status(200)
    .json({ message: "Connected to reading Position API", req: req.body });
});

module.exports = router;
