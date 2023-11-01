import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { JwtHelpers } from "../../../helpers/jwtHelpers/jwt.helpers";
import Configs from "../../configs";
import { IAuthCredentials } from "./auth.interface";
import ApiError from "../../errors/apiErrorHandler";

const registerUser = async (
  userData: IUser,
): Promise<IGenericResult<IAuthCredentials>> => {
  const isExsists = await User.findById(userData?.id);
  if (isExsists) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "email already in use!", [
      { path: "email", message: "email already in use" },
    ]);
  }

  const result = await User.create(userData);

  const accessToken = JwtHelpers.createToken(
    { id: result?.id, email: result?.email },
    Configs.jwtAccessTokenSecret!,
    { expiresIn: Configs.jwtAccessTokenExpirationDate },
  );

  const refreshToken = JwtHelpers.createToken(
    { id: result?.id, email: result?.email },
    Configs.jwtRefreshTokenSecret!,
    { expiresIn: Configs.jwtRefreshTokenExpirationDate },
  );

  return {
    statusCode: StatusCodes.CREATED,
    message: "user registerd successfully",
    data: { ...result.toJSON(), accessToken, refreshToken },
  };
};

export const AuthServices = { registerUser };
