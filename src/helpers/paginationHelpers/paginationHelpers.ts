import { IPaginationOptions } from "./paginationHelpers.interface";

const calculatePagination = (
  paginationOptions: Pick<IPaginationOptions, "page" | "limit">,
): Pick<IPaginationOptions, "page" | "skip" | "limit"> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export default calculatePagination;
