import "reflect-metadata";
import express, {
	Request,
	Response,
	NextFunction,
	ErrorRequestHandler,
} from "express";
import createError from "http-errors";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";

import tasksRoute from "./routes/tasks.route";
import usersRoute from "./routes/users.route";
import globalErrorHandler from "./utils/global-error-handler";
import isAuth from "./middlewares/is-auth.middleware";

const app = express();
const env = process.env.NODE_ENV;

app.disable("x-powered-by");

if (env === "development") {
	app.use(morgan("combined"));
}

// Access-Control-Allow-Origin * only in development env
app.use(
	cors({
		origin: env === "production" ? "*" : "*",
		credentials: true,
	})
);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", usersRoute);
app.use("/tasks", isAuth, tasksRoute);

// Handle API 404 not found error
app.all("*", (req, res, next) => {
	next(createError(404, `${req.originalUrl} is not exist`));
});

// Handle global errors
app.use(globalErrorHandler);

export default app;
