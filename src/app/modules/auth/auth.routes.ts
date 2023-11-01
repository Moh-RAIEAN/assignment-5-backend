import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

const router: Router = Router();

router.post("/register", AuthControllers.registerUser);

export const AuthRoutes = router;
