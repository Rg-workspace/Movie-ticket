import express from "express";
import {
  Add_New_Booking,
  delete_booking,
  get_booking_by_id,
} from "../controller/BookingCreate.js";
const bookingRouter = express.Router();
bookingRouter.post("/", Add_New_Booking);
bookingRouter.get("/:id", get_booking_by_id);
bookingRouter.delete("/:id", delete_booking);
export default bookingRouter;
