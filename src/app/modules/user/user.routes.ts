import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router: Router = Router();

router.get("/:userId", UserControllers.readUser);

export const UserRoutes = router;
