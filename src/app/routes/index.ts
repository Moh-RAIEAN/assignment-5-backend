import { Router } from "express";
import { IRoute } from "./routes.interface";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { BookRoutes } from "../modules/book/book.routes";
// import { UserRoutes } from "../modules/user/user.routes";
// import { AuthRoutes } from "../modules/auth/auth.routes";
// import { ReviewRoutes } from "../modules/review/review.routes";

const appRouter: Router = Router();
const routes: IRoute[] = [
  { path: "/auth", route: AuthRoutes },
  // { path: "/users", route: UserRoutes },
  { path: "/books", route: BookRoutes },
  // { path: "/reviews", route: ReviewRoutes },
  { path: "/users", route: UserRoutes },
];

routes.forEach((route) => {
  appRouter.use(route.path, route.route);
});

export default appRouter;
