import { JsonWebTokenError } from "jsonwebtoken";
import { IGenericError } from "../middlewares/globalErrorHadler/globalErrorHandler.interface";

const handlejwtError = (error: JsonWebTokenError): IGenericError => {
  const message = error.name;
  const errorMessages = [{ path: "", message: error?.message }];
  return { message, errorMessages };
};

export default handlejwtError;
