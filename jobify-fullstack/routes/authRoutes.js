import express from "express";
import { login, register, updateUser } from "../controllers/authController.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/update").patch(updateUser);

export default router;
