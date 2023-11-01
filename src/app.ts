import express from "express";
import cors from "cors";
import appRouter from "./app/routes";
import routerNotFoundHandler from "./app/middlewares/routerNotFoundHandler";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHadler/globalErrorHandler";
import catchAsync from "./app/shared/catchAsync";
const app = express();

// Parse incoming request bodies in JSON format
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route and its handler
app.get(
  "/",
  catchAsync(async (req, res) => {
    res.send("Hello, World!");
    // throw new Error("haga");
  }),
);
app.use("/api/v1/", appRouter);
app.use(routerNotFoundHandler);
app.use(globalErrorHandler);
export default app;
