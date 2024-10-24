import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movies from "../models/Movies.js";
import User from "../models/User.js";
export const Add_New_Booking = async (req, res) => {
  const { movie, date, seatnumber, user } = req.body;
  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movies.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
  let booking;
  try {
    booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatnumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }
  console.log("Done");
  return res.status(201).json({ booking });
};

export const get_booking_by_id = async (req, res) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Booking.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to find booking" });
  }
  return res.status(201).json({ booking });
};

export const delete_booking = async (req, res) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndRemove(id).populate("user movie");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
