import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Types } from "mongoose";

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
export const UserServices = { readUser };
