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
const updateBookReview = async (
  reviewId: string,
  userId: string,
  updatedData: IReview,
): Promise<IGenericResult<IReview | null>> => {
  const isBookReviewExists = await Review.findById(reviewId);

  if (!isBookReviewExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "requested review not found!", [
      { path: "reviewId", message: "requested review not found!" },
    ]);
  }
  if (!(isBookReviewExists.user.toString() === userId)) {
    throw new ApiError(StatusCodes.NOT_FOUND, "permission denied!", [
      { path: "userId", message: "permission denied!" },
    ]);
  }

  const result = await Review.findOneAndUpdate(
    { _id: reviewId },
    { ...updatedData },
    { new: true },
  ).populate("user");
  return {
    statusCode: StatusCodes.OK,
    message: "review updated successfully!",
    data: result,
  };
};
export const ReviewServices = {
  createReview,
  getBookReviews,
  updateBookReview,
};
