import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

const router: Router = Router();

router.post("/register", AuthControllers.registerUser);
router.post("/login", AuthControllers.loginUser);

export const AuthRoutes = router;
