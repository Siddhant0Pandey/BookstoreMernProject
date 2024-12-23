import mongoose, { mongo } from "mongoose";

const personSchema = mongoose.Schema(
  {
    FirstName: String,
    required: true,
  },
  {
    SecondName: String,
    required: true,
  },
  {
    email: URL,
    required: true,
  },
  {
    username: "String",
    required: true,
  },
  {
    password: "String",
    required: true,
  }
);

export const Person = mongoose.model("Person", personSchema);
