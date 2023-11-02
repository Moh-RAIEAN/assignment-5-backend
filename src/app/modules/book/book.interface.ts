import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  user: Types.ObjectId | IUser;
};

export type IBookModel = Model<IBook, Record<string, unknown>>;
