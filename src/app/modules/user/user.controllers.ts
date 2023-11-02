import { Types } from "mongoose";
import sendResponse from "../../../helpers/sendResponseHelpers/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { UserServices } from "./user.service";

const getUser = catchAsync(async (req, res) => {
  const userId = req.params?.userId;
  const result = await UserServices.getUser(
    userId as unknown as Types.ObjectId,
  );
  sendResponse(res, {
    statusCode: result?.statusCode,
    message: result?.message,
    data: result?.data,
  });
});

export const UserControllers = { getUser };
