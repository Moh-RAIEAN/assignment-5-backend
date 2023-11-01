export type IGenericError = {
  statusCode?: number;
  message: string;
  errorMessages: { path: string | number; message: string }[];
};

export type IGenericErrorResponse = IGenericError & {
  statusCode: number;
  success: boolean;
  stack: string;
};
