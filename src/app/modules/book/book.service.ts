import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IBook } from "./book.interface";
import Book from "./book.model";
import {
  IFilters,
  IPaginationOptions,
} from "../../../helpers/paginationHelpers/paginationHelpers.interface";
import { BookConstants } from "./book.constants";
import calculatePagination from "../../../helpers/paginationHelpers/paginationHelpers";
import { filterHelpers } from "../../../helpers/filterHelpers/filterHelpers";

const createBook = async (bookData: IBook): Promise<IGenericResult<IBook>> => {
  const result = await Book.create(bookData);

  return {
    statusCode: StatusCodes.OK,
    message: "book created successfully!",
    data: result,
  };
};

const getBooks = async (
  filters: IFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResult<IBook[]>> => {
  const { searchTerm, sortBy, sortOrder, ...otherFilters } = filters;
  const searchCondition: Record<string, unknown> = {};
  const { searchableFileds } = BookConstants;
  if (searchTerm) {
    searchCondition.$or = filterHelpers.searchCondition(
      searchTerm,
      searchableFileds,
    );
  }

  const bookFilterKeys = Object.keys(otherFilters);
  const filtersCondition: Record<string, unknown> = {};
  if (bookFilterKeys?.length) {
    filtersCondition.$and = filterHelpers.filtersCondition(otherFilters);
  }

  const whereCondition = {
    $and: [
      searchCondition?.$or ? searchCondition : {},
      filtersCondition?.$and ? filtersCondition : {},
    ],
  };

  const sortCondition = filterHelpers.sortCondition({
    sortBy,
    sortOrder,
  });
  const { page, skip, limit } = calculatePagination(paginationOptions);

  const result = await Book.find(whereCondition)
    .sort({ ...sortCondition })
    .skip(skip)
    .limit(limit);
  const total = await Book.find(whereCondition).count();

  return {
    statusCode: StatusCodes.OK,
    message: "books retrived successfully!",
    meta: { page, limit, total },
    data: result,
  };
};
export const BookServices = { createBook, getBooks };
