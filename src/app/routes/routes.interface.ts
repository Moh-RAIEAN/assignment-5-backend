import { Router } from "express";

export type IRoute = {
  path: string;
  route: Router;
};
