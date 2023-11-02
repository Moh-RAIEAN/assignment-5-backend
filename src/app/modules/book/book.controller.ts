import { IPaginationOptions } from "../../../helpers/paginationHelpers/paginationHelpers.interface";
import sendResponse from "../../../helpers/sendResponseHelpers/sendResponse";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const bookData = req.body;
  const result = await BookServices.createBook(bookData);
  sendResponse(res, {
    statusCode: result?.statusCode,
    message: result?.message,
    data: result?.data,
  });
});

const getBooks = catchAsync(async (req, res) => {
  const bookFilters = pick(req.query, [
    "searchTerm",
    "genre",
    "publicationYear",
    "sortBy",
    "sortOrder",
  ]);
  const paginationOptions = pick(req.query, [
    "page",
    "limit",
  ]) as unknown as IPaginationOptions;
  const result = await BookServices.getBooks(bookFilters, paginationOptions);
  sendResponse(res, {
    statusCode: result?.statusCode,
    message: result?.message,
    meta: result?.meta,
    data: result?.data,
  });
});

export const BookControllers = { createBook, getBooks };
