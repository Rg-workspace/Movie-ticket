import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  let admin;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "Cannot store admin " });
  }
  return res.status(201).json({ admin });
};

export const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password is incorrect" });
  }
  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return res
    .status(200)
    .json({ message: "Admin Login Successfuly", token, id: existingAdmin._id });
};

export const Get_Admin = async (req, res) => {
  let admin;
  try {
    admin = await Admin.find();
  } catch (err) {
    console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "Admin Not Found" });
  }
  return res.status(200).json({ admin });
};

export const Get_Admin_By_ID = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id).populate();
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};
