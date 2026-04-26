const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    const review = await Review.create({
      user: req.user._id,
      listing: req.params.listingId,
      rating,
      comment
    });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      listing: req.params.listingId
    }).populate("user", "name");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};