import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { User } from "../models/authModel";
import config from "../config/variables";
import { sendResetMail } from "../utils/sendResetEmail";

// @desc Login
// @route POST /auth
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist!" });
    const isPassCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPassCorrect)
      return res.status(400).json({ message: "Incorrect credentials!" });

    const accessToken = jwt.sign(
      {
        userInfo: {
          name: existingUser.name,
          email: existingUser.email,
          userId: existingUser._id,
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: config.access_token_expire_duration }
    );

    const refreshToken = jwt.sign(
      {
        userInfo: {
          name: existingUser.name,
          email: existingUser.email,
          userId: existingUser._id,
        },
      },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: config.refresh_token_expire_duration }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken containing user info
    res.json({
      accessToken,
      user: {
        name: existingUser.name,
        email: existingUser.email,
        userId: existingUser._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// @desc register new user and login the user
// @route POST /auth
export const register = async (req: Request, res: Response) => {
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
      verified: false,
    });

    const accessToken = jwt.sign(
      {
        userInfo: {
          name: newUser.name,
          email: newUser.email,
          userId: newUser._id,
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: config.access_token_expire_duration }
    );

    const refreshToken = jwt.sign(
      {
        userInfo: {
          name: newUser.name,
          email: newUser.email,
          userId: newUser._id,
        },
      },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: config.refresh_token_expire_duration }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken containing user info
    res.json({
      accessToken,
      user: {
        name: newUser.name,
        email: newUser.email,
        userId: newUser._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// @desc Refresh
// @route GET /auth/refresh
export const refresh = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    `${process.env.REFRESH_TOKEN_SECRET}`,
    async (err: VerifyErrors | null, decoded: any) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        email: decoded.userInfo.email,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = jwt.sign(
        {
          userInfo: {
            name: foundUser.name,
            email: foundUser.email,
            userId: foundUser._id,
          },
        },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: config.access_token_expire_duration }
      );

      res.json({
        accessToken,
        user: {
          name: foundUser.name,
          email: foundUser.email,
          userId: foundUser._id,
        },
      });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
export const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Cookie cleared" });
};

//@desc forgot password
//@route PUT /auth/forgot-password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    // Get the user from the collection
    const user = await User.findOne({ email: req.params.email.toLowerCase() });
    if (!user) {
      return res.status(200).json({
        message: "User does not exist!",
      });
    }

    const resetToken = jwt.sign(
      {
        userInfo: {
          email: user.email,
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "1d" }
    );

    await User.findOneAndUpdate(
      { email: user.email },
      {
        passwordResetToken: resetToken,
        passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      { upsert: true, new: true }
    );
    const origin_url =
      process.env.NODE_ENV == "development" ? config.dev_url : config.live_url;
    const url = `${origin_url}/reset-password?reset_token=${resetToken}`;
    await sendResetMail(
      config.from_email,
      user.email,
      url,
      "Reset your Password"
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err: any) {
    return res.status(500).json({
      message: "There was an error sending email",
    });
  }
};

//@desc reset password
//@route PATCH /auth/reset-password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.resetToken) {
      return res.status(500).json();
    }
    //Check the token has not expired
    jwt.verify(
      body.resetToken,
      `${process.env.ACCESS_TOKEN_SECRET}`,
      async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        if (body.password !== body.confirmPassword)
          return res.status(400).json({ message: "Passwords don't match!" });
        const hashedPassword = await bcrypt.hash(body.password, 12);
        await User.findOneAndUpdate(
          { email: decoded.userInfo.email },
          {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetAt: null,
          }
        );
        res.status(200).json();
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc get user
// @route GET /auth
export const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const user = await User.findOne(
      { email: email },
      { __v: 0, password: 0, confirmPassword: 0 }
    );

    if (!user) {
      return res.status(404).json(null);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred! Could not get user.");
  }
};
