import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import { AuthValidations } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequestHandler";

const router: Router = Router();

router.post(
  "/register",
  validateRequest(AuthValidations.registerValidationZodSchema),
  AuthControllers.registerUser,
);
router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationZodSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
