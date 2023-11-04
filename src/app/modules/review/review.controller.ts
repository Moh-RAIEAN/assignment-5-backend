import { IPaginationOptions } from "../../../helpers/paginationHelpers/paginationHelpers.interface";
import sendResponse from "../../../helpers/sendResponseHelpers/sendResponse";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import { ReviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const bookData = req.body;
  const { id: userId } = req.user!;
  const result = await ReviewServices.createReview(userId, bookData);
  sendResponse(res, {
    statusCode: result?.statusCode,
    message: result?.message,
    data: result?.data,
  });
});

const getBookReviews = catchAsync(async (req, res) => {
  const bookId = req.params?.bookId;
  const paginationOptions = pick(req.query, [
    "page",
    "limit",
  ]) as unknown as IPaginationOptions;
  const result = await ReviewServices.getBookReviews(bookId, paginationOptions);
  sendResponse(res, {
    statusCode: result?.statusCode,
    message: result?.message,
    meta: result?.meta,
    data: result?.data,
  });
});
export const ReviewControllers = { createReview, getBookReviews };
