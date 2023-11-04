import { Router } from "express";
import { ReviewControllers } from "./review.controller";
import validateAuth from "../../middlewares/authHandler";
import validateRequest from "../../middlewares/validateRequestHandler";
import { reviewValidations } from "./review.validation";

const router: Router = Router();

router.post(
  "/",
  validateAuth(),
  validateRequest(reviewValidations.createReviewZodValitaionSchema),
  ReviewControllers.createReview,
);

router.get(
  "/:bookId",
  validateAuth(),
  validateRequest(reviewValidations.getBookReviewsZodValitaionSchema),
  ReviewControllers.getBookReviews,
);

router.patch(
  "/:reviewId",
  validateAuth(),
  validateRequest(reviewValidations.updateBookReviewsZodValitaionSchema),
  ReviewControllers.updateBookReview,
);

router.delete(
  "/:reviewId",
  validateAuth(),
  validateRequest(reviewValidations.deleteBookReviewsZodValitaionSchema),
  ReviewControllers.deleteBookReview,
);

export const ReviewRoutes = router;
