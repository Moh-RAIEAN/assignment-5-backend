import sendResponse from "../../../helpers/sendResponseHelpers/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { AuthServices } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.registerUser(userData);
  sendResponse(res, {
    statusCode: result?.statusCode,
    message: result?.message,
    data: result?.data,
  });
});

export const AuthControllers = { registerUser };
