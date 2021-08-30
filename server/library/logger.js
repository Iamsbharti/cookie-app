const { createLogger, transports, format } = require("winston");
const dotenv = require("dotenv");

dotenv.config();
const testOptions = {
  level: "emerg",
  silent: true,
};
const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: "./logs/all-logs.log",
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(process.env.NODE_ENV === "TEST" ? testOptions : {}),
  ],
});

module.exports = logger;
