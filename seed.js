const mongoose = require("mongoose");
const Listing = require("./models/Listing");
require("dotenv").config();

const OWNER_ID = "69ee11f3e51898cd55e4840a"; // tumhara user ID

const listings = [
  {
    title: "Cozy Beach House in Goa",
    description: "Beautiful beachfront property with stunning ocean views. Perfect for a relaxing vacation.",
    location: "Goa, India",
    price: 4500,
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Luxury Villa in Udaipur",
    description: "Stunning lakeside villa with private pool and breathtaking views of Lake Pichola.",
    location: "Udaipur, Rajasthan",
    price: 12000,
    images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Himalayan Cottage in Manali",
    description: "Peaceful mountain retreat surrounded by snow-capped peaks and pine forests.",
    location: "Manali, Himachal Pradesh",
    price: 3200,
    images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Heritage Haveli in Jaipur",
    description: "Experience royal Rajasthani culture in this beautifully restored 18th century haveli.",
    location: "Jaipur, Rajasthan",
    price: 6500,
    images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Houseboat Stay in Kerala",
    description: "Drift through serene backwaters on a traditional Kerala houseboat with all amenities.",
    location: "Alleppey, Kerala",
    price: 8000,
    images: ["https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Treehouse Resort in Wayanad",
    description: "Unique treehouse experience in the middle of a lush green forest. Wake up to birdsong.",
    location: "Wayanad, Kerala",
    price: 5500,
    images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Ski Chalet in Auli",
    description: "Cozy chalet near India's best ski slopes with stunning Himalayan panoramas.",
    location: "Auli, Uttarakhand",
    price: 7000,
    images: ["https://images.unsplash.com/photo-1548777123-e216912df7d8?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Desert Camp in Jaisalmer",
    description: "Luxury tented camp in the Thar Desert. Camel rides, folk music and starry nights included.",
    location: "Jaisalmer, Rajasthan",
    price: 4000,
    images: ["https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Cliffside Cottage in Coorg",
    description: "Romantic cottage nestled in coffee plantations with misty valley views.",
    location: "Coorg, Karnataka",
    price: 3800,
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Modern Apartment in Mumbai",
    description: "Stylish sea-facing apartment in Bandra with all modern amenities and city views.",
    location: "Mumbai, Maharashtra",
    price: 5000,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Tea Garden Bungalow in Darjeeling",
    description: "Charming colonial bungalow surrounded by sprawling tea gardens and mountain views.",
    location: "Darjeeling, West Bengal",
    price: 4200,
    images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"],
    owner: OWNER_ID,
  },
  {
    title: "Island Resort in Andaman",
    description: "Private beach resort with crystal clear waters, water sports and coral reef snorkeling.",
    location: "Port Blair, Andaman",
    price: 9500,
    images: ["https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800"],
    owner: OWNER_ID,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    await Listing.deleteMany({}); // purani listings delete
    console.log("Old listings deleted 🗑️");

    await Listing.insertMany(listings);
    console.log("15 listings added successfully! 🎉");

    mongoose.connection.close();
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

seedDB();