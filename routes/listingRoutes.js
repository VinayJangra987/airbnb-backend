const express = require("express");
const {
  addListing,
  getAllListings,
  getListingById,
  deleteListing,
  updateListing,
  getMyListings,
} = require("../controllers/listingController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// add property (protected + image upload)
router.post(
  "/",
  protect,
  upload.array("images", 5),
  addListing
);

// get all properties (public)
router.get("/", getAllListings);

// get logged-in user's listings
router.get("/me", protect, getMyListings);

// get single listing
router.get("/:id", getListingById);

// delete listing (owner only)
router.delete("/:id", protect, deleteListing);

// update listing (owner only)
router.put("/:id", protect, updateListing);

module.exports = router;