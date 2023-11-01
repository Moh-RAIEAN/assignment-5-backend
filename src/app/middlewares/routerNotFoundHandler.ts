import { RequestHandler } from "express";

const routerNotFoundHandler: RequestHandler = async (req, res) => {
  res.send({ message: "route not found!" });
};

export default routerNotFoundHandler;
