const express = require("express");
const {
  createBooking,
  cancelBooking,
  getMyBookings,
  getListingBookings,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/listing/:listingId", getListingBookings);

module.exports = router;