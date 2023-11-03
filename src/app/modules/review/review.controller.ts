import sendResponse from "../../../helpers/sendResponseHelpers/sendResponse";
import catchAsync from "../../shared/catchAsync";
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

export const ReviewControllers = { createReview };
