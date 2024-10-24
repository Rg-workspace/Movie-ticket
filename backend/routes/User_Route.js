import express from "express";
const userRouter = express.Router();
import {
  GetUser,
  RegisterUser,
  UpdateUser,
  DeleteUser,
  Login,
  User_BY_id,
  getBookingsOfUser,
} from "../controller/UserCreate.js";

userRouter.get("/", GetUser);
userRouter.post("/RegisterUser", RegisterUser);
userRouter.put("/:id", UpdateUser);
userRouter.delete("/:id", DeleteUser);
userRouter.get("/:id", User_BY_id);
userRouter.post("/Login", Login);
userRouter.get("/bookings/:id", getBookingsOfUser);
export default userRouter;
