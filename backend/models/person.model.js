import mongoose, { mongo } from "mongoose";

const personSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  SecondName: {
    type: String,
    required: true,
  },
  email: {
    type: URL,
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

export const Person = mongoose.model("Person", personSchema);
