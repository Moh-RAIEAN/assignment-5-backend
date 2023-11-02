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

router.get("/", BookControllers.getBooks);

router.get("/:bookId", BookControllers.getBook);

export const BookRoutes = router;
