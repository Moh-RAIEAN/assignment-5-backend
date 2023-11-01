/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type IUser = {
  id: Types.ObjectId;
  email: string;
  password: string;
  profileImage: string;
};

type IUserStatics = {
  comparePassword: (
    givenPassword: string,
    savedPassword: string,
  ) => Promise<boolean>;
};
export type IUserModel = Model<IUser, Record<string, string>> & IUserStatics;
