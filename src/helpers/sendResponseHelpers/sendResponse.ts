import { Response } from "express";
import {
  IGenericResponse,
  IGenericResult,
} from "./sendResponseHelpers.interface";
import { StatusCodes } from "http-status-codes";

const sendResponse = <T>(res: Response, data: IGenericResult<T>) => {
  const statusCode: number = data.statusCode || StatusCodes.OK;
  const response: IGenericResponse<T> = {
    statusCode,
    success: true,
    meta: data?.meta,
    data: data?.data,
    message: data.message,
  };
  res.status(statusCode).json(response);
};

export default sendResponse;
