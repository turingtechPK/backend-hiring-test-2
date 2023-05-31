let Review = require('../models/review.model');

const getAllReviews = async (req, res, next) => {
    try {
        Review.find().populate('volume').populate('user')
        .then((rev) => res.status(201).json(rev))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
};


const addNewReview = async(req, res, next) => {
    const volume = req.body.volume;
    const user = req.body.user;
    const rating = req.body.rating;
    const text = req.body.text;

    const temp_review = await Review.find({volume, user});
    if (Array.isArray(temp_review) && temp_review.length > 0){
        //user has already given a review of the volume
        return res.status(409).json({ message: "Review already present for volume!", review: temp_review })
    }
    
    const newRev = new Review({ volume, user, rating, text });
    newRev
      .save()
      .then(() => res.json({ message: "Review added!", review: newRev }))
      .catch((err) => res.status(400).json("Error: " + err));
}

exports.getAllReviews = getAllReviews;
exports.addNewReview = addNewReview;
