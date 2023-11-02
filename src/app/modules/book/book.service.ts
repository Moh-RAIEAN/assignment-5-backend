import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IBook } from "./book.interface";
import Book from "./book.model";

const createBook = async (bookData: IBook): Promise<IGenericResult<IBook>> => {
  const result = await Book.create(bookData);

  return {
    statusCode: StatusCodes.OK,
    message: "book created successfully!",
    data: result,
  };
};
export const BookServices = { createBook };
