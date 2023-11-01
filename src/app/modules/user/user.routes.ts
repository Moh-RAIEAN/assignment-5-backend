import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router: Router = Router();

router.post("/create-user", UserControllers.createUser);
router.get("/:userId", UserControllers.readUser);

export const UserRoutes = router;
