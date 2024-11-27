const express = require('express');
const BookingModel = require('../models/Booking');


const router = express.Router()



router.post("/create", async (req, res) => {
    console.log("req", req.body)
    try {
        await BookingModel.create(req.body)

        res.status(201).json({ message: "Bike booked successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message || "Failed to book bike" })
    }
})

router.get("/mybookings", async (req, res) => {
    console.log("debug")
    try {
        const { userId, ownerId } = req.query;

        const matchQuery = {};
        if (userId) matchQuery.user = userId;

        const pipeline = [
            { $match: matchQuery },
            {
                $lookup: {
                    from: "bikes", // The name of the bikes collection
                    localField: "bike",
                    foreignField: "_id",
                    as: "bikeDetails",
                },
            },
            {
                $unwind: "$bikeDetails",
            },
        ];

        if (ownerId) {
            pipeline.push({
                $match: { "bikeDetails.owner": ownerId },
            });
        }

        pipeline.push({ $sort: { createdAt: -1 } });

        const mybookings = await BookingModel.aggregate(pipeline);

        
        return res.status(200).json({
            data: mybookings,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
        });
    }
});


module.exports = router;