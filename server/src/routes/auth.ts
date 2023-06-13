import express from "express";
import { User } from "../models/authModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

//Sign In
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist!" });
    const isPassCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPassCorrect)
      return res.status(400).json({ message: "Incorrect credentials!" });
    const token = jwt.sign(
      { data: `${existingUser.email}` + `${existingUser._id}` },
      `${process.env.SECRET}`,
      { expiresIn: "7d" }
    );

    const formatedUser = {
      userId: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    };

    res.status(201).json({ user: formatedUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

//Sign Up
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match!" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      `${process.env.SECRET}`,
      {
        expiresIn: "7d",
      }
    );

    const formatedUser = {
      userId: newUser._id,
      email: newUser.email,

      name: newUser.name,
    };

    res.status(201).json({ user: formatedUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

//Get User
router.get("/get-user", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne(
      { email: email },
      { __v: 0, password: 0, confirmPassword: 0 }
    );
    console.log(user);
    if (!user) return res.status(404).json(null);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("An error occured! Could not fetch value.");
  }
});

export default router;
