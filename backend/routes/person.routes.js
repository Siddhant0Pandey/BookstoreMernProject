import express from "express";
import { Person } from "../models/person.model.js";

const router = express.Router();

// create the book db
router.post("/", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: "Send all the required fields" });
    }

    const newPerson = {
      username: req.body.username,
      password: req.body.password,
    };

    const person = await Person.create(newPerson);

    return res.status(200).send(person);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// retrieve the book
router.get("/", async (req, res) => {
  try {
    const person = await Person.find({});
    res.status(200).send({ count: person.length, data: person });
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
});

// retrieve book by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    if (!person) {
      return res.status(404).send({ message: "Person not found" });
    }
    res.status(200).send(person);
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
});

// update the data
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findByIdAndUpdate(id, req.body);
    if (!person) {
      return res.status(404).send({ message: "Person not found" });
    }
    const updatedPerson = await Person.findById(id);
    // res.status(200).send({ message: "Book  Updated successfully" });
    res.status(200).send(updatedPerson);
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
});

// delete the book
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findByIdAndDelete(id, req.body);
    if (!book) {
      return res.status(404).send({ message: "Person not found" });
    }
    res.status(200).send({ message: "Person  Deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.messsage });
  }
});

export default router;
