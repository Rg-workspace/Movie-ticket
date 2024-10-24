import express from "express";
const app = express();
import userRouter from "./routes/User_Route.js";
import adminRouter from "./routes/Admin_Route.js";
import movieRouter from "./routes/Movies_Router.js";
import bookingRouter from "./routes/Booking_Route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
app.use(cors());

const PORT = process.env.port_no;
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);
import { DB_CONNECT } from "./config/database.js";
DB_CONNECT();

app.listen(PORT, () => {
  console.log(`Server Started Successfully at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>My home Page ..yes!!!</h1>`);
});
