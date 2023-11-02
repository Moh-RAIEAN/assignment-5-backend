import sendResponse from "../../../helpers/sendResponseHelpers/sendResponse";
import catchAsync from "../../shared/catchAsync";
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

export const BookControllers = { createBook };
