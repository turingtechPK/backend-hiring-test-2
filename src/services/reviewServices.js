const Review = require("../models/Reviews");

const getReviewForVolumeByUser = async (user_id, volume_id) => {
  const review = await Review.findOne({
    user: user_id,
    volume: volume_id,
  });
  return review;
};

const getReviewsForVolume = async (volume) => {
  const review = await Review.find({
    volume: volume,
  });

  return review;
};

module.exports = { getReviewForVolumeByUser, getReviewsForVolume };
