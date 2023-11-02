import { Router } from "express";
import { BookControllers } from "./book.controller";
import validateRequest from "../../middlewares/validateRequestHandler";
import { BookValidations } from "./book.validation";

const router: Router = Router();

router.post(
  "/",
  validateRequest(BookValidations.createBookZodValitaionSchema),
  BookControllers.createBook,
);
router.get(
  "/",
  //   validateRequest(BookValidations.createBookZodValitaionSchema),
  BookControllers.getBooks,
);

export const BookRoutes = router;
