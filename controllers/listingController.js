// const Listing = require("../models/Listing");

// // ADD LISTING
// exports.addListing = async (req, res) => {
//   try {
//     const { title, description, location, price } = req.body;

//     // basic validation
//     if (!title || !description || !location || !price) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     // image validation
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "At least one image required" });
//     }

//     const imageUrls = req.files.map((file) => file.path);

//     const listing = await Listing.create({
//       title,
//       description,
//       location,
//       price,
//       images: imageUrls,
//       owner: req.user._id,
//     });

//     res.status(201).json({
//       message: "Listing created successfully",
//       listing,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET ALL LISTINGS
// exports.getAllListings = async (req, res) => {
//   try {
//     const listings = await Listing.find().populate(
//       "owner",
//       "name email"
//     );
//     res.json(listings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Listing = require("../models/Listing");

// =======================
// ADD LISTING
// =======================
exports.addListing = async (req, res) => {
  try {
    const { title, description, location, price } = req.body;

    if (!title || !description || !location || !price) {
      return res.status(400).json({ message: "All fields required" });
    }
const imageUrls = req.files ? req.files.map(file => file.path) : [];

    const listing = await Listing.create({
      title,
      description,
      location,
      price: Number(price),
      images: imageUrls,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET ALL LISTINGS + SEARCH & FILTER
// =======================
exports.getAllListings = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const listings = await Listing.find(query).populate(
      "owner",
      "name email"
    );

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET MY LISTINGS ✅ (THIS WAS MISSING)
// =======================
exports.getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user._id });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET SINGLE LISTING
// =======================
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DELETE LISTING (OWNER ONLY)
// =======================
exports.deleteListing = async (req, res) => {
  try {

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // safer owner comparison
    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Listing deleted successfully" });

  } catch (error) {

    console.log("DELETE ERROR:", error);

    res.status(500).json({ message: error.message });

  }
};
// =======================
// UPDATE LISTING (OWNER ONLY)
// =======================
exports.updateListing = async (req, res) => {
  try {
    const { title, description, location, price } = req.body;

    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (title) listing.title = title;
    if (description) listing.description = description;
    if (location) listing.location = location;
    if (price) listing.price = Number(price);

    await listing.save();
    res.json({ message: "Listing updated", listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};