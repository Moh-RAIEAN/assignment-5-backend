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

export const ReviewRoutes = router;
