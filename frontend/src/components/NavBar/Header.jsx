import React, { useEffect, useState } from "react";
import { GetUser, getallmovies } from "../Data/Data";
import {
  AppBar,
  Toolbar,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";

import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Box } from "@mui/system";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions } from "../../Store/Redux";
function Header() {
  const [value, setvalue] = useState();
  const [movies, setMovies] = useState([]);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    getallmovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log(movies);
  useEffect(() => {
    GetUser()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar className="nav">
        <Box width={"20%"} display={"flex"} gap={2}>
          <Typography fontSize={20} fontWeight={500}>
            CineMall
          </Typography>
          <MovieFilterIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  input: { color: "white" },
                }}
                variant="standard"
                {...params}
                placeholder="Search Movies"
              />
            )}
          />
        </Box>
        <Box display="flex">
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setvalue(val)}
          >
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                {" "}
                <Tab to="/auth" LinkComponent={NavLink} label="Login" />
                <Tab to="/admin" LinkComponent={NavLink} label="Admin" />
                <Tab to="/movies" LinkComponent={NavLink} label="Movies" />
              </>
            )}

            {isUserLoggedIn && (
              <>
                {" "}
                <Tab LinkComponent={Link} to="/user" label="user" />
                <Tab
                  onClick={() => dispatch(userActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}

            {isAdminLoggedIn && (
              <>
                {" "}
                <Tab LinkComponent={Link} to="/profile" label="Profile" />
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab
                  onClick={() => dispatch(adminActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
