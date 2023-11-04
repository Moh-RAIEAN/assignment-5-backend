import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IReview } from "./review.interface";
import Review from "./review.model";
import ApiError from "../../errors/apiErrorHandler";
import { IPaginationOptions } from "../../../helpers/paginationHelpers/paginationHelpers.interface";
import calculatePagination from "../../../helpers/paginationHelpers/paginationHelpers";
import Book from "../book/book.model";

const createReview = async (
  userId: string,
  reviewData: IReview,
): Promise<IGenericResult<IReview>> => {
  const isBookExists = await Book.findById(reviewData?.bookId);
  if (!isBookExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "requested book not found!", [
      { path: "bookId", message: "requested book not found!" },
    ]);
  }
  const result = await Review.create({ ...reviewData, user: userId });

  return {
    statusCode: StatusCodes.OK,
    message: "review created successfully!",
    data: result,
  };
};

const getBookReviews = async (
  bookId: string,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResult<IReview[]>> => {
  const { page, skip, limit } = calculatePagination(paginationOptions);

  const result = await Review.find({ bookId })
    .skip(skip)
    .limit(limit)
    .populate("user");

  const total = await Review.find({ bookId }).count();

  return {
    statusCode: StatusCodes.OK,
    message: "reviews retrived successfully!",
    meta: { page, limit, total },
    data: result,
  };
};
export const ReviewServices = { createReview, getBookReviews };
