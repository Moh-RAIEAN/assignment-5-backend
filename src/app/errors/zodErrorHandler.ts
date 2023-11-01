import { ZodError, ZodIssue } from "zod";
import { IGenericError } from "../middlewares/globalErrorHadler/globalErrorHandler.interface";

const handleZodError = (error: ZodError): IGenericError => {
  const message = error.name;
  const errorMessages = error.issues.map((issue: ZodIssue) => {
    return { path: issue.path[issue.path.length - 1], message: issue.message };
  });
  return { message, errorMessages };
};

export default handleZodError;
