const express = require("express");
const router = express.Router();
const Review = require("../models/Reviews");

const {
  getReviewForVolumeByUser,
  getReviewsForVolume,
} = require("../services/reviewServices");

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "Connected to Review API", req: req.body });
});

router.post("/", async (req, res) => {
  const { rating, text, user, volume } = req.body;

  try {
    const fetchReview = await getReviewForVolumeByUser(user, volume);

    if (fetchReview) {
      // Review already exists
      // Update Review
      fetchReview.rating = rating;
      fetchReview.text = text;
      fetchReview.save();
      res.status(204).json({
        message: "Updated!",
        fetchReview,
      });
    } else {
      const review = await Review.create({
        user: user,
        volume: volume,
        text: text,
        rating: rating,
      });

      res.status(201).json({
        message: "Created!",
        // review,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to create Review" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const { volume } = req.body;

  try {
    const fetchReview = await getReviewsForVolume(volume);

    if (fetchReview.length === 0) {
      res.status(404).json({
        message: "Not Found!",
        // review,
      });
    } else {
      res.status(200).json({
        message: "Found!",
        fetchReview,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error occured" });
    console.log(err);
  }
});

router.delete("/", async (req, res) => {
  const { user_id, volume } = req.body;

  try {
    const fetchReview = getReviewForVolumeByUser(user_id, volume);

    if (fetchReview) {
      //Review already exists
      // Update Review

      fetchReview.remove();
      res.status(200).json({
        message: "Deleted!",
      });
    }
    res.status(404).json({
      message: "Not Found!",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create Review" });
    console.log(err);
  }
});

module.exports = router;
