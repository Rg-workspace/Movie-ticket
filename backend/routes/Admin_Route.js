import express from "express";

import {
  addAdmin,
  AdminLogin,
  Get_Admin,
  Get_Admin_By_ID,
} from "../controller/AdminCreate.js";
const adminRouter = express.Router();
adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", AdminLogin);
adminRouter.get("/get_Admin", Get_Admin);
adminRouter.get("/:id", Get_Admin_By_ID);
export default adminRouter;
