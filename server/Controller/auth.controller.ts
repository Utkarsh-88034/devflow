import { Request, Response } from "express";
import User from "../Models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const { SECRET = "secret" } = process.env;

const signup = async (req: Request, res: Response) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    // send new user as response
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};
const login = async (req: Request, res: Response) => {
  try {
    // check if the user exists
    console.log(req.body);
    const user = await User.findOne({ userName: req.body.userName });
    console.log(user);
    if (user != null) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ username: user.userName }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { login, signup };
