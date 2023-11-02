import { Router } from "express";
import { UserControllers } from "./user.controllers";
import validateRequest from "../../middlewares/validateRequestHandler";
import { UsersValidations } from "./user.validation";

const router: Router = Router();

router.get(
  "/:userId",
  validateRequest(UsersValidations.getUserZodValidationSchema),
  UserControllers.getUser,
);

export const UserRoutes = router;
