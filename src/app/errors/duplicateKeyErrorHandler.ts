import { IGenericError } from "../middlewares/globalErrorHadler/globalErrorHandler.interface";

export const handleDuplicateKeyError = (
  duplicateKeyError: Record<string, object>,
): IGenericError => {
  const errorMessages = Object.keys(duplicateKeyError?.keyPattern).map(
    (errorPath) => {
      return { path: errorPath, message: `${errorPath} is already in use` };
    },
  );

  return { message: "duplicate key error", errorMessages };
};
