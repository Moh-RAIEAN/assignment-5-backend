export type IMeta = {
  page: number;
  total: number;
  limit: number;
};

export type IGenericResult<T> = {
  statusCode?: number;
  message: string;
  meta?: IMeta | null | undefined;
  data: T;
};

export type IGenericResponse<T> = IGenericResult<T> & {
  success: boolean;
};
