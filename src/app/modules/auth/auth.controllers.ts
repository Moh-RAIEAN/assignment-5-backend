import sendResponse from "../../../helpers/sendResponseHelpers/sendResponse";
import Configs from "../../configs";
import catchAsync from "../../shared/catchAsync";
import { AuthServices } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const { data, ...othersResult } = await AuthServices.registerUser(userData);
  const { accessToken, refreshToken, ...userInfo } = data;
  const cookiesOptions = {
    isSeceure: Configs.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);
  sendResponse(res, {
    statusCode: othersResult?.statusCode,
    message: othersResult?.message,
    data: { ...userInfo, accessToken },
  });
});
const loginUser = catchAsync(async (req, res) => {
  const authData = req.body;
  const { data, ...othersResult } = await AuthServices.loginUser(authData);
  const { accessToken, refreshToken, ...userInfo } = data;
  const cookiesOptions = {
    isSeceure: Configs.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);
  sendResponse(res, {
    statusCode: othersResult?.statusCode,
    message: othersResult?.message,
    data: { ...userInfo, accessToken },
  });
});

export const AuthControllers = { registerUser, loginUser };
