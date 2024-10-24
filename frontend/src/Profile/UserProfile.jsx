import { React, Fragment, useEffect, useState } from "react";
import {
  getUserBooking,
  getUserDetails,
  deleteBooking,
} from "../components/Data/Data";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-hot-toast";
const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => console.log(err));
    toast.error("movie deleted successfully");
  };
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <Typography
              fontFamily={"sans-serif"}
              fontSize={35}
              marginLeft={25}
              fontWeight={500}
            >
              User Details
            </Typography>
            <AccountCircleIcon
              sx={{
                fontSize: "10rem",
                textAlign: "center",
                ml: 3,
                marginLeft: "35%",
              }}
            />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              fontSize={20}
              fontWeight={500}
            >
              Name: {user.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              fontSize={20}
              fontWeight={500}
            >
              Email: {user.email}
            </Typography>
          </Box>
        )}
        {bookings && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={" Apple Color Emoji"}
              textAlign="center"
              padding={2}
              fontWeight={500}
            >
              Bookings of user {user.name}
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#FF5B22",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{
                        margin: 1,
                        width: "auto",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      <Typography fontWeight={100} fontSize={20}>
                        Movie:{booking.movie.title}
                      </Typography>
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      <Typography fontWeight={100} fontSize={20}>
                        Seat: {booking.seatnumber}
                      </Typography>
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      <Typography fontWeight={100} fontSize={20}>
                        Date: {new Date(booking.date).toDateString()}
                      </Typography>
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForeverIcon sx={{ color: "white" }} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
