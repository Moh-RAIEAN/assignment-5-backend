import { Router } from "express";
import { BookControllers } from "./book.controller";

const router: Router = Router();

router.post("/", BookControllers.createBook);

export const BookRoutes = router;
