import express from "express";
import {
  login,
  register,
  getUser,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
} from "@controllers/authController";
import loginLimiter from "@middlewares/loginLimiter";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.get("/refresh", refresh);
router.post("/register", register);
router.patch("/forgot-password/:email", forgotPassword);
router.patch("/reset-password", resetPassword);
router.post("/logout", logout);
router.get("/get-user", getUser);

export default router;
