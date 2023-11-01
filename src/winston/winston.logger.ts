import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  const dateObj = new Date(timestamp);
  const dateFormat = `[📆${dateObj.toLocaleString("en-US", {
    month: "short",
  })}-${dateObj.getDate()}-${dateObj.getFullYear()}]--[⌚${dateObj.toLocaleString(
    "en-US",
    { hour: "numeric", minute: "numeric", second: "numeric", hour12: true },
  )}]`;

  return `${dateFormat}--[${level}]: ${message}\n`;
});

const infoLogger = createLogger({
  format: combine(timestamp(), colorize(), myFormat),
  transports: [new transports.Console({ format: myFormat })],
});

const errorLogger = createLogger({
  format: combine(timestamp(), colorize(), myFormat),
  transports: [new transports.Console({ format: myFormat })],
});

export const Loggers = {
  infoLogger,
  errorLogger,
};
