import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  image: string;
  user: Types.ObjectId | IUser;
};

export type IBookModel = Model<IBook, Record<string, unknown>>;

export type IBookSearchableFileds = (keyof Pick<
  IBook,
  "title" | "author" | "genre"
>)[];
export type IBookFiltarableFileds = (keyof Pick<
  IBook,
  "genre" | "publicationYear"
>)[];
