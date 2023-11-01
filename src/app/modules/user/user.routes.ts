import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router: Router = Router();

router.post("/create-user", UserControllers.createUser);

export const UserRoutes = router;
