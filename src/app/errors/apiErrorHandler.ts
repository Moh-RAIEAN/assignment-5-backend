class ApiError extends Error {
  statusCode: number;
  errorMessages: { path: string; message: string }[];
  constructor(
    statusCode: number,
    message: string,
    errorMessages = [{ path: "", message: "" }],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
