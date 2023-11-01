import { StatusCodes } from "http-status-codes";
import { IGenericResult } from "../../../helpers/sendResponseHelpers/sendResponseHelpers.interface";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const registerUser = async (
  userData: IUser,
): Promise<IGenericResult<IUser | null>> => {
  const result = await User.create(userData);
  return {
    statusCode: StatusCodes.CREATED,
    message: "user registerd successfully",
    data: result,
  };
};

export const AuthServices = { registerUser };
