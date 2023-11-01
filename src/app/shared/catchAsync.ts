import { RequestHandler } from "express";

const catchAsync = (requestHandlerFunc: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await requestHandlerFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
