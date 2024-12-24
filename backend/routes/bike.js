const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Bike = require("../models/Bike");
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filenames
  },
});

const upload = multer({ storage });

router.use("/uploads", express.static(uploadDir));

router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, price, cc, owner, address, contact } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (
    !title ||
    !description ||
    !price ||
    !cc ||
    !owner ||
    !address ||
    !contact
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }
  console.log(imageUrl);

  const newBike = new Bike({
    title,
    description,
    price,
    cc,
    owner,
    address,
    contact,
    imageUrl,
    status: "pending",
  });

  try {
    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (error) {
    console.error("Error saving bike:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    let { userId: excludeUserId, owner: ownerId, status } = req.query;

    // Check if userId and owner are not equal to "null"
    if (excludeUserId === "null") {
      excludeUserId = null;
    }
    if (ownerId === "null") {
      ownerId = null;
    }

    // Create a filter object with optional conditions
    const filter = {
      $or: [
        ...(ownerId ? [{ owner: ownerId }] : []),
        ...(excludeUserId ? [{ owner: { $ne: excludeUserId } }] : []),
      ],
      ...(status ? { status: status } : {}),
    };

    // Remove empty objects from the filter
    filter.$or = filter.$or.filter((obj) => Object.keys(obj).length > 0);

    // If filter.$or is empty, remove it from the filter
    if (filter.$or.length === 0) {
      delete filter.$or;
    }

    console.log("filter", filter);

    // Fetch bikes based on the filter
    const bikes = await Bike.find(filter).populate({
      path: "owner",
      select: "-password",
    }); // i dont want to select owner's password

    return res.json(bikes);
  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Approve a bike
router.patch("/approve/:id", async (req, res) => {
  try {
    const bikeId = req.params.id;
    const bike = await Bike.findByIdAndUpdate(
      bikeId,
      { approved: true },
      { new: true }
    );
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.status(200).json({ message: "Bike approved successfully", bike });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving bike" });
  }
});

router.put("/:bikeId", async (req, res) => {
  try {
    const bikeId = req.params.bikeId;
    const updatedBike = await Bike.findByIdAndUpdate(bikeId, req.body, {
      new: true,
    });
    if (!updatedBike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.status(200).json({ message: "Bike updated successfully", updatedBike });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating bike" });
  }
});
// Reject a bike
router.delete("/reject/:id", async (req, res) => {
  try {
    const bikeId = req.params.id;
    const bike = await Bike.findByIdAndDelete(bikeId);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.status(200).json({ message: "Bike rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting bike" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.find({ approved: true }); // Only approved bikes
    res.status(200).json(bikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bikes" });
  }
});

router.get("/analytics", async (req, res) => {
  try {
    const bikes = await Bike.countDocuments(); // Only approved bikes
    const totalRental = await Bike.countDocuments({
      isRented: true,
    });

    res.status(200).json({
      totalBikes: bikes,
      totalRental,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bikes" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bikeId = req.params.id;
    const deletedBike = await Bike.findByIdAndDelete(bikeId);
    if (!deletedBike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.status(200).json({ message: "Bike deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting bike" });
  }
});

module.exports = router;
