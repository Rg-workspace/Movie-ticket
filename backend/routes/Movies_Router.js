import express from "express";
import {
  Add_Movie,
  getMovieById,
  getallmovies,
} from "../controller/MovieCreate.js";

const movieRouter = express.Router();
movieRouter.post("/", Add_Movie);
movieRouter.get("/getmovies", getallmovies);
movieRouter.get("/:id", getMovieById);
export default movieRouter;
