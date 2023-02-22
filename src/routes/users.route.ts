import express from "express";
import { body } from "express-validator";

const router = express.Router();

import { login, register } from "../controllers/users.controller";

router.post(
	"/login",
	body("email").notEmpty().withMessage("Email is required"),
	body("password").notEmpty().withMessage("Password is required"),
	login
);

router.post(
	"/register",
	body("name").notEmpty().withMessage("name is required"),
	body("email").notEmpty().withMessage("Email is required"),
	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 10 })
		.withMessage("Password must be at least 10 characters long"),
	register
);

export default router;
