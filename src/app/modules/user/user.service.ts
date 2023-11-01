import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (
  userData: IUser,
): Promise<IGenericResult<IUser | null>> => {
  const result = await User.create(userData);
  return {
    statusCode: StatusCodes.CREATED,
    message: "user created",
    data: result,
  };
};

export const UserServices = { createUser };
