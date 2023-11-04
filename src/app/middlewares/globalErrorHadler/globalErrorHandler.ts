import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { IGenericErrorResponse } from "./globalErrorHandler.interface";
import { StatusCodes } from "http-status-codes";
import handleZodError from "../../errors/zodErrorHandler";
import mongoose from "mongoose";
import handleMongooseError from "../../errors/mongooseErrorHandler";
import ApiError from "../../errors/apiErrorHandler";
import { Loggers } from "../../../winston/winston.logger";
import sendErrorResponse from "./errorResponse.handlter";
import { handleDuplicateKeyError } from "../../errors/duplicateKeyErrorHandler";
import { JsonWebTokenError } from "jsonwebtoken";
import handlejwtError from "../../errors/jwtErrorHandler";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next,
) => {
  const errorResponse: IGenericErrorResponse = {
    success: false,
    statusCode: StatusCodes.BAD_REQUEST,
    message: "",
    errorMessages: [],
    stack: error.stack || "",
  };

  if (error instanceof ApiError) {
    errorResponse.message = error.message;
    errorResponse.statusCode = error.statusCode;
    errorResponse.errorMessages = error.errorMessages.length
      ? error.errorMessages
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    errorResponse.message = simplifiedError.message;
    errorResponse.errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof mongoose.Error.ValidationError) {
    const simplifiedError = handleMongooseError(error);
    errorResponse.message = simplifiedError.message;
    errorResponse.errorMessages = simplifiedError.errorMessages;
  } else if (error.code === 11000 || error.code === 10001) {
    const simplifiedError = handleDuplicateKeyError(error);
    errorResponse.message = simplifiedError.message;
    errorResponse.errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof JsonWebTokenError) {
    const simplifiedError = handlejwtError(error);
    errorResponse.message = simplifiedError.message;
    errorResponse.errorMessages = simplifiedError.errorMessages;
  } else {
    errorResponse.message = error.message;
    errorResponse.errorMessages = [{ path: "", message: error.message }];
    errorResponse.statusCode = error.statusCode
      ? error.statusCode
      : errorResponse.statusCode;
  }

  Loggers.errorLogger.error(error.message);
  Loggers.errorLogger.error(error.stack);

  sendErrorResponse(res, errorResponse);
};

export default globalErrorHandler;
