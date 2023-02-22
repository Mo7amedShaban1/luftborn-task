import winston, { format } from "winston";

const dateFormat = () => {
	return new Date();
};

const logger = winston.createLogger({
	format: format.combine(
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		format.json()
	),
	transports: [
		new winston.transports.File({
			filename: `./logs/errors.log`,
			level: "error",
		}),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: format.combine(format.colorize(), format.simple(), format.cli()),
		})
	);
}

export default logger;
