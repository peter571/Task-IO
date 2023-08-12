import express from "express";
import { login, register, getUser } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/get-user", getUser);

export default router;
