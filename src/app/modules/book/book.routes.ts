import { Router } from "express";
import { BookControllers } from "./book.controller";
import validateRequest from "../../middlewares/validateRequestHandler";
import { BookValidations } from "./book.validation";
import validateAuth from "../../middlewares/authHandler";

const router: Router = Router();

router.post(
  "/",
  validateRequest(BookValidations.createBookZodValitaionSchema),
  BookControllers.createBook,
);

router.get("/", BookControllers.getBooks);

router.get(
  "/:bookId",
  validateRequest(BookValidations.getBookZodValitaionSchema),
  BookControllers.getBook,
);

router.patch("/:bookId", validateAuth(), BookControllers.updateBook);

export const BookRoutes = router;
