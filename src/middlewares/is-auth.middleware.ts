import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../utils/catch-async-errors.util";
import createError from "http-errors";
import jwt from "jsonwebtoken";

const isAuth = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		// Split bearer token
		var token = req.headers.authorization?.split(" ")[1];

		if (!token) return next(createError(401, "Unauthorized access!"));

		const decoded = await jwt.verify(token, "mysercert");
		(req as any).user = decoded;

		// some functionality can be added:
		// 1) check if user is still exist
		// 2) check if user's password has been changed after token issued

		next();
	}
);

export default isAuth;
