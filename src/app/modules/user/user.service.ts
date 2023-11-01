import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Types } from "mongoose";

const createUser = async (
  userData: IUser,
): Promise<IGenericResult<IUser | null>> => {
  const result = await User.create(userData);
  return {
    statusCode: StatusCodes.CREATED,
    message: "user created successfully",
    data: result,
  };
};

const readUser = async (
  userId: Types.ObjectId,
): Promise<IGenericResult<IUser | null>> => {
  const result = await User.findById(userId);
  return {
    statusCode: StatusCodes.CREATED,
    message: "user retrived successfully",
    data: result,
  };
};
export const UserServices = { createUser, readUser };
