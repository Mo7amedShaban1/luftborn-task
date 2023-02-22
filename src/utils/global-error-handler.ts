import { RequestHandler } from "express";
import type { ErrorRequestHandler } from "express";

const sendErrorDev: ErrorRequestHandler = (err, req, res, next) => {
	console.error("ERROR 💥", err);

	const statusCode = (err as any).status || 500;
	res.status(statusCode).json({
		status: "failed",
		error: err.message,
		stack: err.stack,
	});
};

// const sendErrorProduction = () => {}

export default sendErrorDev;
