import { RequestHandler } from "express";
import { AnyZodObject, ZodEffects } from "zod";
import catchAsync from "../shared/catchAsync";

const validateRequest = (
  validationSchema: AnyZodObject | ZodEffects<AnyZodObject>,
): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    await validationSchema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
