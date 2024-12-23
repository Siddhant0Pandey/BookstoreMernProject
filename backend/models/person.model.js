import mongoose, { mongo } from "mongoose";

const personSchema = mongoose.Schema({
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
