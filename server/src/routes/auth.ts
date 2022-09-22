import express from "express";
import { User } from "../models/authModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

//Sign In
router.post('/', async (req, res) => {
  try {
    const existingUser = await User.findOne(req.body.email);
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist!" });
    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isPassCorrect)
      return res.status(400).json({ message: "Incorrect credentials!" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      `${process.env.SECRET}`,
      { expiresIn: "7d" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

//Sign Up
router.post('/', async (req, res) => {
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
    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

export default router;
