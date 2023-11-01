import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import Configs from "./app/configs";
import { Loggers } from "./winston/winston.logger";
const { infoLogger, errorLogger } = Loggers;
process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  errorLogger.error(error.stack);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(`${Configs.dbUrl}`);
    infoLogger.info("db connected");
    server = app.listen(Configs.port, () =>
      infoLogger.info(`server is running on ${Configs.port}`),
    );
  } catch (error) {
    errorLogger.error(error);
    errorLogger.error("ehano aisi");
  }

  process.on("unhandledRejection", (error) => {
    errorLogger.error("server is closing due to : ", error);
    if (server) {
      server.close((err) => {
        if (err) {
          errorLogger.error("error while closing server", error);
        }
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main().catch((err) => errorLogger.error(err));

process.on("SIGTERM", () => {
  infoLogger.info("sigterm recieived");
  if (server) {
    server.close((error) => {
      if (error) {
        errorLogger.error("error while closing server on sigterm", error);
      }
    });
  }
});

// console.log(x);
