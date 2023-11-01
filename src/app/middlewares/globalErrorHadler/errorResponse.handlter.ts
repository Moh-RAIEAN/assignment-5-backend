import { Response } from "express";
import { IGenericErrorResponse } from "./globalErrorHandler.interface";

const sendErrorResponse = (res: Response, error: IGenericErrorResponse) => {
  res.status(error.statusCode).json(error);
};

export default sendErrorResponse;
