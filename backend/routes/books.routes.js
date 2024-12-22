import express from "express";
import { Book } from "../models/books.model.js";

const router = express.Router();

// create the book db
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all the required fields" });
    }

    const newBook = {
      title: req.body.title,
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
router.get("/", async (req, res) => {
  try {
    const book = await Book.find({});
    res.status(200).send({ count: book.length, data: book });
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
});

// retrieve book by id
router.get("/:id", async (req, res) => {
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

// update the data
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    const updatedBook = await Book.findById(id);
    // res.status(200).send({ message: "Book  Updated successfully" });
    res.status(200).send(updatedBook);
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
});

// delete the book
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id, req.body);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book  Deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
});

export default router;
