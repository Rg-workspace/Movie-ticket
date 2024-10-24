import React, { useEffect, useState } from "react";
import SwiperGallery from "./Swiper/Swiper";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import { getallmovies } from "./Data/Data";
import SectionCard from "./MovieCardSection/MovieCard/SectionCard";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getallmovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="main">
      <SwiperGallery />
      <Box padding={5} margin="auto">
        <Typography variant="h3" textAlign={"center"}>
          Trending Movies
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <SectionCard
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </div>
  );
};
export default HomePage;
