import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  console.log("getting the reques");
  res.status(200).json({ message: "hello" });
});

app.listen(PORT, () => {
  console.log(`Successfully connected to the port : ${PORT}`);
});
