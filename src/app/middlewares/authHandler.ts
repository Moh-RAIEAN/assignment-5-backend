import { RequestHandler } from "express";
import catchAsync from "../shared/catchAsync";
import ApiError from "../errors/apiErrorHandler";
import { StatusCodes } from "http-status-codes";
import { JwtHelpers } from "../../helpers/jwtHelpers/jwt.helpers";
import Configs from "../configs";
import { JwtPayload, Secret } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

const validateAuth = (): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(StatusCodes.FORBIDDEN, "Un authenticated user");
    }

    const { id, email } = JwtHelpers.verifyToken(
      token,
      Configs.jwtAccessTokenSecret as Secret,
    ) as JwtPayload;

    const isExist = await User.findOne({ _id: id, email });
    if (!isExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, "No user found");
    }

    req.user = { id, email };
    next();
  });
};

export default validateAuth;
