import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IReview } from "./review.interface";
import Review from "./review.model";
import Book from "../book/book.model";
import ApiError from "../../errors/apiErrorHandler";

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

export const ReviewServices = { createReview };
