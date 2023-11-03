import { Model, ObjectId } from "mongoose";
import { IUser } from "../user/user.interface";

export type IReview = {
  title: string;
  bookId: ObjectId;
  user: ObjectId | IUser;
};

export type IReviewModel = Model<IReview, Record<string, unknown>>;
