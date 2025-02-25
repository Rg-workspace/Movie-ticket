import Movies from "../models/Movies.js";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
export const Add_Movie = async (req, res) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }
  let adminId;

  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  // if (
  //   !title &&
  //   //title.trim() === "" &&
  //   !description &&
  //   //description.trim() == "" &&
  //   !posterUrl
  //   // posterUrl.trim() === ""
  // ) {
  //   return res.status(422).json({ message: "Invalid Inputs" });
  // }

  let movie;
  try {
    movie = new Movies({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }
  if (!movie) {
    res.status(500).json({ message: "Request Failed" });
  }
  console.log("Movie Created");
  res.status(201).json({ movie });
};

export const getallmovies = async (req, res) => {
  let movies;
  try {
    movies = await Movies.find();
  } catch (err) {
    console.log(err);
  }
  if (!movies) {
    res.status(500).json({ message: "Movies Not Found" });
  }
  res.status(201).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movies.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ movie });
};
