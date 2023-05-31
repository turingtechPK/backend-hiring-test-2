const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review-controller');

router.post('/new', reviewController.addNewReview)
router.get('/', reviewController.getAllReviews)


module.exports = router;