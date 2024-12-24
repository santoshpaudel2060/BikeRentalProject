const express = require('express');
const router = express.Router();
const { createReview, getReviews } = require('../controllers/reviewController');

router.post('/', createReview); // POST route to create a review
router.get('/', getReviews); // GET route to fetch all reviews

module.exports = router;
