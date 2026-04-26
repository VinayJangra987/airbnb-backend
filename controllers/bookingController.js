const Booking = require("../models/Booking");



// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate, totalPrice } = req.body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: "All fields required" });
    }

    const overlappingBooking = await Booking.findOne({
      listing: listingId,
      status: "active",
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message: "This property is already booked for selected dates",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      listing: listingId,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL BOOKING
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    if (booking.startDate <= new Date())
      return res
        .status(400)
        .json({ message: "Cannot cancel started booking" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY BOOKINGS
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "listing",
      "title location price"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getListingBookings = async (req, res) => {
  try {
    const { listingId } = req.params;

    const bookings = await Booking.find({
      listing: listingId,
      status: "active",
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBooking,
  cancelBooking,
  getMyBookings,
  getListingBookings,
};