import http from "http";
import app from "./src/app";
import logger from "./src/utils/logger.util";
import mongoose from "mongoose";

const port = process.env.PORT || 8080;

// In production:
// It's recommend to not hard coding any sensitive data
// We can use .env file
const DB = "mongodb://127.0.0.1:27017/test";

mongoose
	.connect(DB, {})
	.then(() => {
		console.log("Successfully connected the DB");
	})
	.catch((error) => {
		logger.error(`Unexpected error on mongodb: ${error.message}`);
	});

const server = http.createServer(app);

// Catch unexpected errors to prevent node process to exit
process.on("uncaughtException", (err) => {
	logger.error(`Uncaught Exception: ${err.message}`);
});

process.on("unhandledRejection", function (reason) {
	logger.error(`Unhandled rejection: reason: ${reason}`);
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
