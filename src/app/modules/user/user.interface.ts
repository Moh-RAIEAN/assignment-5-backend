import { Model, Types } from "mongoose";

export type IUser = {
  id: Types.ObjectId;
  email: string;
  password: string;
  profileImage: string;
};

export type IUserModel = Model<IUser, Record<string, string>>;
