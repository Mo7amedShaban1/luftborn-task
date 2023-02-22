import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import catchAsyncErrors from "../utils/catch-async-errors.util";
import createError from "http-errors";
import { validationResult } from "express-validator";

import User from "../models/user.model";

const signToken = (id: any, res: any) => {
	const token = jwt.sign({ id }, "mysercert");

	return token;
};

export const login = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user)
			return next(
				createError(400, "no account associated with the email address")
			);

		const checkPassword = await User.checkPassword(password, user.password);

		if (!checkPassword) return next(createError(400, "Invalid credentials!"));

		// IF EVERYTHING OKAY, GENERATE A TOKEN
		const token = signToken(user.id, res);

		(user as any).password = undefined;
		res.status(200).json({
			status: "success",
			token,
			user,
		});
	}
);

export const register = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const user = await User.create(req.body);
		const token = signToken(user.id, res);

		(user as any).password = undefined;
		res.status(201).json({
			status: "success",
			token,
			user,
		});
	}
);
