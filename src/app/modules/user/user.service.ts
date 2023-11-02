import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Types } from "mongoose";
import ApiError from "../../errors/apiErrorHandler";

const getUser = async (
  userId: Types.ObjectId,
): Promise<IGenericResult<IUser | null>> => {
  const result = await User.findById(userId);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "user not found!", [
      { path: "userId", message: "user not found!" },
    ]);
  }
  return {
    statusCode: StatusCodes.OK,
    message: "user retrived successfully",
    data: result,
  };
};
export const UserServices = { getUser };
