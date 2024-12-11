import express from "express";
import { PORT, db_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/books.model.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log("getting the reques");
  res.status(200).json({ message: "hello" });
});

// create the book db
app.post("/books", async (req, res) => {
  try {
    if (!req.body.tittle || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all the required fields" });
    }

    const newBook = {
      tittle: req.body.tittle,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(200).send(book);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// retrieve the book

app.get("/books", async (req, res) => {
  try {
    const book = await Book.find({});
    res.status(200).send({ count: book.length, data: book });
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
});

// retrieve book by id
app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
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
