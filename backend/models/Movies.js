import mongoose from "mongoose";
import Booking from "./Booking.js";
import Admin from "./Admin.js";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 15,
  },
  description: {
    type: String,
    required: true,
  },
  actors: [{ type: String, required: true }],
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Movies", movieSchema);
