const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews
} = require("../controllers/reviewController");

// add review
router.post("/:listingId", protect, addReview);

// get reviews
router.get("/:listingId", getReviews);

module.exports = router;