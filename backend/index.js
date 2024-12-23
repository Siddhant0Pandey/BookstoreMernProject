import express from "express";
import { PORT, db_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/books.routes.js";
import personRoute from "./routes/person.routes.js";
import cors from "cors";
import "dotenv/config";
import { localAuthMiddleware } from "./auth/user.auth.js";

const app = express();
//
app.use(cors());
//

app.use(express.json());
app.use("/books", booksRoute);
app.use("/person", personRoute);

app.get("/", localAuthMiddleware, (req, res) => {
  console.log("getting the reques");
  res.status(200).json({ message: "hello" });
});

// Mongoose connnection
mongoose
  .connect(db_URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Successfully connected to the port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });
