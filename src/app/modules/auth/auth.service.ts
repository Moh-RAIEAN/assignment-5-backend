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

const loginUser = async (
  authData: IAuthCredentials,
): Promise<IGenericResult<IAuthCredentials>> => {
  const isExsists = await User.findOne({ email: authData?.email }).select(
    "+password",
  );
  if (!isExsists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "user does not exists!", [
      { path: "email", message: "user does not exists" },
    ]);
  }

  const isPasswordMatched = await User.comparePassword(
    authData?.password,
    isExsists?.password,
  );
  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "wrong password", [
      { path: "password", message: "wrong password" },
    ]);
  }

  const accessToken = JwtHelpers.createToken(
    { id: isExsists?.id, email: isExsists?.email },
    Configs.jwtAccessTokenSecret!,
    { expiresIn: Configs.jwtAccessTokenExpirationDate },
  );

  const refreshToken = JwtHelpers.createToken(
    { id: isExsists?.id, email: isExsists?.email },
    Configs.jwtRefreshTokenSecret!,
    { expiresIn: Configs.jwtRefreshTokenExpirationDate },
  );

  return {
    statusCode: StatusCodes.CREATED,
    message: "user logged in successfully",
    data: { ...isExsists.toJSON(), accessToken, refreshToken },
  };
};
export const AuthServices = { registerUser, loginUser };
