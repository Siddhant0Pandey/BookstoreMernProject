import express from "express";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Person } from "../models/person.model.js";

const app = express();

app.use(passport.initialize());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("recieved credential", username, password);

      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect UserName" });
      }
      const isPasswordMatch = user.password === password ? true : false;

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

export const localAuthMiddleware = passport.authenticate("local", {
  session: false,
});
