import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getallmovies } from "../Data/Data";
import SectionCard from "../MovieCardSection/MovieCard/SectionCard";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getallmovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#D80032"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="35px 10px"
        marginTop={5}
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
      >
        {movies &&
          movies.map((movie, index) => (
            <SectionCard
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
