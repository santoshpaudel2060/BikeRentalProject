const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    const { userName, rating, comment } = req.body;

    try {
        const newReview = new Review({
            userName,
            rating,
            comment,
            createdAt: new Date(),
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: 'Error saving review' });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};
