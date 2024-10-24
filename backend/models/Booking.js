import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movies",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seatnumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Booking", BookingSchema);
