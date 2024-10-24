import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_CONNECT = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connected successfully...");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

export { DB_CONNECT };
