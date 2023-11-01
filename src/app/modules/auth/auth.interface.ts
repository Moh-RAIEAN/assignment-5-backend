import { Types } from "mongoose";

export type IAuthCredentials = {
  id: Types.ObjectId;
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
};
