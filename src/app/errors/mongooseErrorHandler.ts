import { Error } from "mongoose";
import { IGenericError } from "../middlewares/globalErrorHadler/globalErrorHandler.interface";

const handleMongooseError = (error: Error.ValidationError): IGenericError => {
  const message = error.name;
  const errorMessages = Object.values(error.errors).map(
    (err: Error.ValidatorError | Error.CastError) => {
      return { path: err.path, message: err.message };
    },
  );

  return { message, errorMessages };
};

export default handleMongooseError;
